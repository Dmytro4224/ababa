import { AddNewMovieView, IAddNewMovieFormData } from '../../components/cabinet/AddNewMovie'

export interface ICreateMoviePage {
}

export const CreateMoviePage = ({ }: ICreateMoviePage) => {

  const onAddNewMovie = (data: IAddNewMovieFormData) => {
    console.log('data', data);
  }

  return (
    <div>
      <h2>CreateMoviePage</h2>
      <AddNewMovieView onAddNewMovie={onAddNewMovie} />
    </div>
  )
}
