import React, { useRef, useState } from 'react';
import formStyles from '../../styles/form.module.css';
import styles from '../../styles/section.module.css';
import {cls} from "../../helpers/misc";
import {goToMoviesList} from "../../app/navigations";
import {useNavigate} from "react-router-dom";

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


    onAddNewMovie({ ...formData });
  }

  const onInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [name]: e.target.value });

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>🎥&nbsp;Add movie to list</h3>
      <form className="create-movie" onSubmit={onSubmit}>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="movieName">Movie name</label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              className={cls(formStyles.input)}
              maxLength={50}
              value={formData.name}
              onChange={onInputChange('name')}
            />
          </div>

          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="movieShort">Short description</label>
            <textarea
              id="movieShort"
              className={cls(formStyles.input)}
              maxLength={256}
              value={formData.short}
              onChange={onInputChange('short')}
            />
          </div>

          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="movieThumb">Thumb image url</label>
            <input
              type="text"
              id="movieThumb"
              className={cls(formStyles.input)}
              maxLength={512}
              value={formData.thumbImage}
              onChange={onInputChange('thumbImage')}
            />
          </div>

          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="moviePreview">Youtube preview url</label>
            <input
              type="text"
              id="moviePreview"
              className={cls(formStyles.input)}
              maxLength={512}
              placeholder="https://www.youtube.com/watch?v=???"
              value={formData.preview}
              onChange={onInputChange('preview')}
            />
          </div>

          <div className={formStyles.buttonsWrap}>
            <button type="button" onClick={goToMoviesList(useNavigate())} className={cls(formStyles.btn)}>Cancel ❌</button>
            <button type="submit" className={cls(formStyles.btn, formStyles.btnSuccess)}>
              Save&nbsp;💾
            </button>
          </div>
      </form>
    </section>
  )
}
