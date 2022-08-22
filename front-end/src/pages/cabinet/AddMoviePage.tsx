import api from '../../api/api';
import { useAppDispatch } from '../../app/hooks';
import { AddNewMovieView, IAddNewMovieFormData } from '../../components/cabinet/AddNewMovie'

export interface ICreateMoviePage {
}

export const CreateMoviePage = ({ }: ICreateMoviePage) => {

  const dispatch = useAppDispatch();

  const onAddNewMovie = (data: IAddNewMovieFormData) => {
    console.log('data', data);

    api.movies.create({
      title: data.title,
      name: data.name,
      description: data.media
    })
      .then(response => {
        
      });
  }

  return (
    <div>
      <h2>CreateMoviePage</h2>
      <AddNewMovieView onAddNewMovie={onAddNewMovie} />
    </div>
  )
}
