import { useRef, useContext} from "react"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { handleUserAvatar } = userContext;

  const avatarInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUserAvatar({
      avatar: avatarInputRef.current.value,
    });
  };


    return(
        <form
          className="popup__form"
          name="avatar-form"
          id="avatar-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="popup__field">
            <input
              className="popup__input popup__input_type_url"
              id="avatar-link"
              name="link"
              placeholder="Avatar image link"
              required
              type="url"
              ref={avatarInputRef}
            />
            <span className="popup__error" id="avatar-link-error"></span>
          </label>
    
          <button className="button popup__button" type="submit">
            Guardar
          </button>
        </form>
    )
};

export default EditAvatar