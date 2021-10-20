const CREATE_PHOTO = 'photos/CREATE_PHOTO';
const SET_PHOTO = 'photos/SET_PHOTO';
const EDIT_PHOTO = 'photos/EDIT_PHOTO'
const REMOVE_PHOTO = 'photos/REMOVE_PHOTO'
const SET_PHOTOS = 'photos/SET_PHOTOS'

const createPhotoAction = (photo) => {
  return {
    type: CREATE_PHOTO,
    payload: photo,
  };
};

const editPhotoAction = (photo) => {
  return {
    type: EDIT_PHOTO,
    payload: photo,
  };
};

const setPhotoAction = (photo) => {
  return {
    type: SET_PHOTO,
    payload: photo,
  };
};

const setPhotosAction = (photos) => {
  return {
    type: SET_PHOTOS,
    payload: photos,
  };
};

const removePhotoAction = (photoId) => {
  return {
    type: REMOVE_PHOTO,
    payload: photoId
  };
};

export const createPhoto = (photo) => async (dispatch) => {
  let response = await fetch('/api/photos', {
    method: 'POST',
    body: JSON.stringify(photo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  response = await response.json();
  dispatch(createPhotoAction(response));
  return response;
}

export const fetchPhoto = (id) => async (dispatch) => {
  const response = await fetch(`/api/photos/${id}`);
  const photo = await response.json();
  if (response.ok) {
    dispatch(setPhotoAction(photo));
    return response;
  }
};

export const editPhoto = (photo) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photo.id}`, {
    method: 'PUT',
    include: 'user',
    body: JSON.stringify(photo)
  });
  dispatch(editPhotoAction(photo));
  return response;
}

export const fetchPhotos = () => async (dispatch) => {
  const response = await fetch('/api/photos');
  const photos = await response.json();
  if (response.ok) {
    dispatch(setPhotosAction(photos));
    return response;
  }
};

export const deletePhoto = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: 'DELETE',
  });

  dispatch(removePhotoAction(photoId));
  dispatch(fetchPhotos());
  return response;
};

let initialState = {};

const photosReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_PHOTO:
      newState.photo = action.payload;
      return newState;
    case SET_PHOTO:
      newState.photos = action.payload;
      return newState;
    case EDIT_PHOTO:
      newState.photos = newState.photos.map(photo => {
        if (photo.id === action.payload.id) {
          return action.payload;
        }
        return photo;
      });
      return newState;
    case REMOVE_PHOTO:
      newState.photos = newState.photos.filter(photo => photo.id !== action.payload);
      return newState;
    case SET_PHOTOS:
      newState.photos = action.payload;
      return newState;
    default:
      return state;
  }
};

export default photosReducer;
