import { useRef, useState } from 'react';

export interface IAddNewMovieView {
  onAddNewMovie: (data: IAddNewMovieFormData) => void;
}

export interface IAddNewMovieFormData {
  name: string;
  short: string;
  thumbImage: string;
  preview: string;
}

const initialState: IAddNewMovieFormData = {
  name: '',
  short: '',
  thumbImage: '',
  preview: ''
}

export const AddNewMovieView = ({ onAddNewMovie }: IAddNewMovieView) => {

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate
    //loginRef.current?.classList.add('is-invalid');
    onAddNewMovie({ ...formData });
  }

  const onInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [name]: e.target.value });

  const nameRef = useRef<HTMLInputElement>(null);
  const shortRef = useRef<HTMLTextAreaElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLInputElement>(null);

  return (
    <form className="create-movie" onSubmit={onSubmit}>
      <fieldset>
        <h3 className="title">🎥 Add movie to list</h3>

        <div className="mb-4">
          <label className="form-label" htmlFor="movieName">Movie name</label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            className="form-control"
            maxLength={50}
            ref={nameRef}
            value={formData.name}
            onChange={onInputChange('name')}
          />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="movieShort">Short description</label>
          <textarea
            id="movieShort"
            className="form-control"
            maxLength={256}
            ref={shortRef}
            value={formData.short}
            onChange={onInputChange('short')}
          />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="movieThumb">Thumb image url</label>
          <input
            type="text"
            id="movieThumb"
            className="form-control"
            maxLength={512}
            ref={thumbRef}
            value={formData.thumbImage}
            onChange={onInputChange('thumbImage')}
          />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="moviePreview">Youtube preview url</label>
          <input
            type="text"
            id="moviePreview"
            className="form-control"
            maxLength={512}
            placeholder="https://www.youtube.com/watch?v=???"
            ref={previewRef}
            value={formData.preview}
            onChange={onInputChange('preview')}
          />
        </div>

        <button type="button" className="nes-btn">Cancel ❌</button>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Save
        </button>
      </fieldset>
    </form>
  )
}
