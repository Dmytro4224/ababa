import { useRef, useState } from 'react';

export interface IAddNewMovieView {
  onAddNewMovie: (data: IAddNewMovieFormData) => void;
}

export interface IAddNewMovieFormData {
  name: string;
  title: string;
  media: string;
}

const initialState: IAddNewMovieFormData = {
  name: '',
  title: '',
  media: ''
}

export const AddNewMovieView = ({ onAddNewMovie }: IAddNewMovieView) => {

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate
    //loginRef.current?.classList.add('is-invalid');
    onAddNewMovie({ ...formData });
  }

  const onInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [name]: e.target.value });

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const mediaRef = useRef<HTMLInputElement>(null);

  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="form-label" htmlFor="movieName">Name</label>
        <input
          type="text"
          id="movieName"
          name="movieName"
          className="form-control"
          ref={nameRef}
          value={formData.name}
          onChange={onInputChange('name')}
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="movieTitle">Title</label>
        <input
          type="text"
          id="movieTitle"
          className="form-control"
          ref={titleRef}
          value={formData.title}
          onChange={onInputChange('title')}
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="movieMedia">Description</label>
        <input
          type="text"
          id="movieMedia"
          className="form-control"
          ref={mediaRef}
          value={formData.media}
          onChange={onInputChange('media')}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Create
      </button>
    </form>
  )
}
