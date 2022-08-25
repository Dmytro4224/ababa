import React from 'react';
import formStyles from '../../styles/form.module.css';
import styles from '../../styles/section.module.css';
import {cls, IFormData, toggleErrorClass} from "../../helpers/misc";
import {goToMoviesList, urls} from "../../app/navigations";
import {Navigate, useNavigate} from "react-router-dom";
import {IAddMovieResponse} from "../../redux/api/moviesApi";
import {useResponse} from "../../app/hooks";

export interface IAddNewMovieView {
  onAddNewMovie: (data: IAddNewMovieFormData) => void;
  isSubmitting: boolean;
  submittedData: IAddMovieResponse | undefined;
}

export interface IAddNewMovieFormData extends IFormData {
  name: string;
  short: string;
  thumbImage: string;
  preview: string;
  error: boolean;
}

const initialState: IAddNewMovieFormData = {
  name: '',
  short: '',
  thumbImage: '',
  preview: '',
  error: false,
  invalidFields: []
}

export const AddNewMovieView = ({ onAddNewMovie, isSubmitting, submittedData }: IAddNewMovieView) => {

  const { formData, setInvalid, onInputChange, onInputFocus } = useResponse(initialState, submittedData);
  const navigate = useNavigate();

  if(submittedData && submittedData.statusCode === 200){
    return <Navigate to={urls.cabinet} state={{ from: submittedData.data.hash }} />
  }

  const checkValidate = (formData: IAddNewMovieFormData) => {
    setInvalid('name', formData.name.length !== 0)

    return formData.invalidFields.length === 0;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(checkValidate(formData)){
      onAddNewMovie({ ...formData });
    }
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>🎥&nbsp;Add movie to list</h3>
      <form onSubmit={onSubmit}>
          <div className={cls(formStyles.field, toggleErrorClass(formData.invalidFields,'name', formStyles.isErrorField ))}>
            <label className={formStyles.label} htmlFor="movieName">Movie name</label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              className={cls(formStyles.input)}
              maxLength={50}
              value={formData.name}
              onChange={onInputChange('name')}
              onFocus={onInputFocus('name')}
            />
            <span className={formStyles.subText}>*Incorrect name</span>
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
          <div className={cls(formStyles.field)}>
            <div className={formStyles.alert}>{formData.error ? <span className={formStyles.subText}>*Error, please try again</span> : '' }</div>
          </div>
          <div className={formStyles.buttonsWrap}>
            <button type="button" onClick={goToMoviesList(navigate)} className={cls(formStyles.btn)}>Cancel ❌</button>
            <button disabled={isSubmitting} type="submit" className={cls(formStyles.btn, formStyles.btnSuccess)}>
              Save&nbsp;💾
            </button>
          </div>
      </form>
    </section>
  )
}
