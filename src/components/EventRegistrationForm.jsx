
import useFormValidation from "./useFormValidation";

// Validation function
const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }

  if (values.attendingWithGuest && !values.guestName) {
    errors.guestName = 'Guest Name is required if attending with a guest';
  }

  return errors;
};

const EventRegistrationForm = () => {
  const initialState = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: '',
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitted,
    submittedData,
  } = useFormValidation(initialState, validate);

  return (
    <div>
      {!isSubmitted ? (
        <div>
            <h1 className="heading">Event Registration Form</h1>
          <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div>
            <label>Are you attending with a guest?</label>
            <input
              type="checkbox"
              name="attendingWithGuest"
              checked={values.attendingWithGuest}
              onChange={handleChange}
            />
          </div>
          {values.attendingWithGuest && (
            <div>
              <label>Guest Name:</label>
              <input
                type="text"
                name="guestName"
                value={values.guestName}
                onChange={handleChange}
              />
              {errors.guestName && <p>{errors.guestName}</p>}
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
        </div>
      ) : (
        <div className="datahead">
          <h2 className="heading">Registration Summary</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Attending with a guest:</strong> {submittedData.attendingWithGuest ? 'Yes' : 'No'}</p>
          {submittedData.attendingWithGuest && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
