import formStyles from '../../styles/form.module.css';
import styles from '../../styles/section.module.css';
import {cls, isNullOrEmpty, setImage} from "../../helpers/misc";
import {goToMoviesList} from "../../app/navigations";
import {useNavigate} from "react-router-dom";
import defaultImage from '../../img/default-image.png';
import cabinetStyles from "../../styles/cabinet.module.css";
import React from "react";

interface IMovieDetailView{
  name: string,
  thumb: string;
  description: string;
  preview: string;
}

export const MovieDetailView = ({ name, thumb, description, preview }: IMovieDetailView) => {
  const navigate = useNavigate();

  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Movie&nbsp;"{name}"</h3>

        {!isNullOrEmpty(thumb) && <div className={cabinetStyles.thumbDetailWrap}>
          <img  onError={(e) => { setImage(e, defaultImage) }} src={thumb} alt=""/>
        </div>}

        <p className="mt-20">
          {description}
        </p>

        {!isNullOrEmpty(preview) && <div className={cabinetStyles.videoWrap}>
          <iframe onError={() => { alert(`error`) }} width="560" height="315" src={preview} title=""
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
        </div>}

      </section>
      <div className={styles.sectionButtons}>
        <button type="button" onClick={goToMoviesList(navigate)} className={cls(formStyles.btn)}>Cancel ❌</button>
      </div>
    </>
  )
}
