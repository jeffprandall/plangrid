
Promise.resolve()
  .then(() => {
    return 'foo';
  })
  .then(str => {
    console.log('here', str);
    return Promise.reject(new Error('Something went wrong!'));
  })
  .then(() => {
    console.log('should not run');
    return 42;
  })
  .catch(err => {
    console.log(err);
    return err;
  })
  .then(arg => {
    console.log('now this runs', arg);
  })


