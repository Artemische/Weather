//storage verification
export const localCheck = (id, city) => {
  const arr = JSON.parse(localStorage.getItem(id) || '[]');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === city){
      return [true,arr[i][2],arr[i][0],arr[i][1],'']
    }
  }
  return [false,undefined,undefined,undefined,undefined];
}
//check at the time of the last cleaning localStorage
export const localClear = () => {
  const lastclear = localStorage.getItem('lastclear'),
  time_now  = (new Date()).getTime();

  // .getTime() returns milliseconds so 1000 * 60 * 60 * 2 = 2 hours
  if ((time_now - lastclear) > 1000 * 60 * 60 * 2) {
    localStorage.clear();
    localStorage.setItem('lastclear', time_now);

  }
}