--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2022-08-20 17:51:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 221 (class 1255 OID 18107)
-- Name: auth_tokens_drop(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.auth_tokens_drop(_userhash uuid, _authtoken uuid) RETURNS TABLE(token uuid, isvalid boolean)
    LANGUAGE plpgsql
    AS $$
declare _token uuid;
	declare _userid integer=-1;
	declare _validityHours integer=6;
begin

	
	begin
		select id  
		into _userId from obj_users where hash=_userhash;
	end;
	
	update auth_tokens set status=false where 
	auth_tokens.userid = _userid and
		auth_tokens.token = _authToken;
	
	select auth_tokens.token
		into _token
	from auth_tokens
	where
		auth_tokens.userid = _userid and
		auth_tokens.token = _authToken and
		auth_tokens.status = true and
		auth_tokens.date > cast(current_timestamp + -_validityHours * interval '1 hour' as timestamp(3));
	
	if _token is not null
	then
		return query select _token as token,true as isValid ;
		return;
	end if;
	
	 return query  select _authToken as token,false as isValid;
	return;
end;
$$;


ALTER FUNCTION public.auth_tokens_drop(_userhash uuid, _authtoken uuid) OWNER TO postgres;

--
-- TOC entry 219 (class 1255 OID 18084)
-- Name: auth_tokens_get(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.auth_tokens_get(_authhash character varying) RETURNS TABLE(token uuid, isvalid boolean)
    LANGUAGE plpgsql
    AS $$
declare _token uuid;
declare _userid integer=-1;
declare _validityhours smallint=6;
begin

begin
		select id  
		into _userId from obj_users where authhash=_authhash;
	end;

if(_userId=-1 or _userId is null)
THEN
	return query select gen_random_uuid() token, false as isValid;
	return;
END IF;

	select auth_tokens.token
		into _token
	from auth_tokens
	where
		auth_tokens.userId = _userId
		and auth_tokens.status = true
		and auth_tokens.date > cast(current_timestamp + -_validityHours * interval '1 hour' as timestamp(3));
	
	if _token is not null
	then
		return query select _token token, true as isValid;
		return;
	end if;
	
	select gen_random_uuid()
	into _token;
	
	insert into auth_tokens(userId, token, status, date)
	values (_userId, _token, true, current_timestamp);
	
	return query select _token token, true as isValid;
end;
$$;


ALTER FUNCTION public.auth_tokens_get(_authhash character varying) OWNER TO postgres;

--
-- TOC entry 218 (class 1255 OID 18080)
-- Name: auth_tokens_isexist(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.auth_tokens_isexist(_userhash uuid, _authtoken uuid) RETURNS TABLE(token uuid, isvalid boolean)
    LANGUAGE plpgsql
    AS $$
	declare _token uuid;
	declare _userid integer=-1;
	declare _validityHours integer=6;
begin


	
	begin
		select id  
		into _userId from obj_users where hash=_userhash;
	end;
	
	select auth_tokens.token
		into _token
	from auth_tokens
	where
		auth_tokens.userid = _userid and
		auth_tokens.token = _authToken and
		auth_tokens.status = true and
		auth_tokens.date > cast(current_timestamp + -_validityHours * interval '1 hour' as timestamp(3));
	
	if _token is not null
	then
		return query select _token as token,true as isValid ;
		return;
	end if;
	
	 return query  select _authToken as token,false as isValid;
	return;
end;
$$;


ALTER FUNCTION public.auth_tokens_isexist(_userhash uuid, _authtoken uuid) OWNER TO postgres;

--
-- TOC entry 217 (class 1255 OID 18077)
-- Name: obj_movie_load(uuid, integer, integer, boolean); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.obj_movie_load(_userhash uuid, _pageindex integer, _pagesize integer, _onlyactive boolean DEFAULT false) RETURNS TABLE(id integer, hash uuid, ownerid integer, name character varying, description character varying, thumbnail character varying, preview character varying, status boolean, date timestamp without time zone, totalrows bigint)
    LANGUAGE plpgsql
    AS $$
declare _ownerid integer;
begin

	begin
		select obj_users.id  
		into _ownerid from obj_users where obj_users.hash=_userHash;
	end;

	return query
	with ids as (
		select
			t.id,
			count(*) over() totalRows
		from obj_movies t
		where
			
			t.ownerid = _ownerid
			and t.status in (true, _onlyActive)
		order by
			t.id
		offset ((_pageIndex - 1) * _pageSize)
		limit _pageSize
	)
	select 
		c.*, 
		t.totalRows
	from ids t
	join obj_movies c on c.id=t.id
	order by
		c.id;

end;
$$;


ALTER FUNCTION public.obj_movie_load(_userhash uuid, _pageindex integer, _pagesize integer, _onlyactive boolean) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 18063)
-- Name: obj_movies; Type: TABLE; Schema: public; Owner: ababa
--

CREATE TABLE public.obj_movies (
    id integer NOT NULL,
    hash uuid,
    ownerid integer,
    name character varying(50),
    description character varying(256),
    thumbnail character varying(512),
    preview character varying(512),
    status boolean,
    date timestamp(3) without time zone
);


ALTER TABLE public.obj_movies OWNER TO ababa;

--
-- TOC entry 222 (class 1255 OID 18112)
-- Name: obj_movies_add(uuid, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.obj_movies_add(_userhash uuid, _name character varying, _description character varying, _thumbnail character varying, _preview character varying) RETURNS SETOF public.obj_movies
    LANGUAGE plpgsql
    AS $$
declare _ownerid integer;
declare _id integer;
declare _hash uuid;
begin
	
	begin
		select obj_users.id  
		into _ownerid from obj_users where obj_users.hash=_userHash;
	end;
	
	select gen_random_uuid()
	into _hash;
		
		INSERT INTO public.obj_movies(
	hash, ownerid, name, description, thumbnail, preview, status, date)
	VALUES (_hash, _ownerid, _name, _description, _thumbnail, _preview, true, current_timestamp)
		returning id into _id;
		
	return query
	select
		*
	from obj_movies
	where
		id = _id;
	
end;
$$;


ALTER FUNCTION public.obj_movies_add(_userhash uuid, _name character varying, _description character varying, _thumbnail character varying, _preview character varying) OWNER TO postgres;

--
-- TOC entry 223 (class 1255 OID 18115)
-- Name: obj_movies_delete(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.obj_movies_delete(_userhash uuid, _moviehash uuid) RETURNS SETOF public.obj_movies
    LANGUAGE plpgsql
    AS $$
begin
update obj_movies m set status=false
from obj_users u where u.id=m.ownerid and u.hash=_userhash
and m.hash =_moviehash;

return query  
select m.* from obj_movies m 
join obj_users u on u.id=m.ownerid and u.hash=_userhash
where m.hash =_moviehash and m.status=false;
	
	return;
end;
$$;


ALTER FUNCTION public.obj_movies_delete(_userhash uuid, _moviehash uuid) OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 18056)
-- Name: obj_users; Type: TABLE; Schema: public; Owner: ababa
--

CREATE TABLE public.obj_users (
    id integer NOT NULL,
    hash uuid,
    name character varying(50),
    authhash character varying(64),
    status boolean,
    date timestamp(3) without time zone
);


ALTER TABLE public.obj_users OWNER TO ababa;

--
-- TOC entry 220 (class 1255 OID 18081)
-- Name: obj_users_add(character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.obj_users_add(_name character varying, _authhash character varying) RETURNS SETOF public.obj_users
    LANGUAGE plpgsql
    AS $$
declare _id integer;
declare _hash uuid;
begin
	
	select id
	into _id from obj_users where authhash=_authhash;
	
	if(_id is not null) THEN
	return query
	select
		*
	from obj_users
	where
		id = -1;
		return;
	end if;
	
	
	select gen_random_uuid()
	into _hash;
		
		INSERT INTO public.obj_users(
	hash, name, authhash, status, date)
	VALUES (_hash, _name, _authhash, true, current_timestamp)
		returning id into _id;
		
	return query
	select
		*
	from obj_users
	where
		id = _id;
	
end;
$$;


ALTER FUNCTION public.obj_users_add(_name character varying, _authhash character varying) OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 18049)
-- Name: auth_tokens; Type: TABLE; Schema: public; Owner: ababa
--

CREATE TABLE public.auth_tokens (
    id integer NOT NULL,
    userid integer,
    token uuid,
    status boolean,
    date timestamp(3) without time zone
);


ALTER TABLE public.auth_tokens OWNER TO ababa;

--
-- TOC entry 200 (class 1259 OID 18047)
-- Name: auth_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: ababa
--

ALTER TABLE public.auth_tokens ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 18061)
-- Name: obj_movies_id_seq; Type: SEQUENCE; Schema: public; Owner: ababa
--

ALTER TABLE public.obj_movies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.obj_movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 202 (class 1259 OID 18054)
-- Name: obj_users_id_seq; Type: SEQUENCE; Schema: public; Owner: ababa
--

ALTER TABLE public.obj_users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.obj_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2871 (class 2606 OID 18053)
-- Name: auth_tokens auth_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: ababa
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 2875 (class 2606 OID 18070)
-- Name: obj_movies obj_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: ababa
--

ALTER TABLE ONLY public.obj_movies
    ADD CONSTRAINT obj_movies_pkey PRIMARY KEY (id);


--
-- TOC entry 2873 (class 2606 OID 18060)
-- Name: obj_users obj_users_pkey; Type: CONSTRAINT; Schema: public; Owner: ababa
--

ALTER TABLE ONLY public.obj_users
    ADD CONSTRAINT obj_users_pkey PRIMARY KEY (id);


-- Completed on 2022-08-20 17:51:08

--
-- PostgreSQL database dump complete
--

