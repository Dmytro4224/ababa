import { useAppSelector } from '../../app/hooks';
import { AddNewMovieView, IAddNewMovieFormData } from '../../components/cabinet/AddNewMovie'
import { useAddMutation } from '../../redux/api/moviesApi';
import { selectToken } from '../../redux/slices/authSlice';

export interface ICreateMoviePage {
}

export const CreateMoviePage = ({ }: ICreateMoviePage) => {

  const token = useAppSelector(selectToken);
  const [save, { isError, isSuccess, isLoading, data }] = useAddMutation();

  const onAddNewMovie = (data: IAddNewMovieFormData) => {
    console.log('data', data);

    save({
      token: token,
      data: {
        name: data.name,
        description: data.short || null,
        thumbnail: data.thumbImage || null,
        preview: data.preview || null
      }
    });
  }

  return (
    <div>
      <h2>CreateMoviePage</h2>
      <AddNewMovieView
        onAddNewMovie={onAddNewMovie}
      />
    </div>
  )
}
