export function getDayHasPassed(dataLocalStorage) {
  const today = new Date();
  const beforeDay = new Date(dataLocalStorage.day);
  const timeDifference = today.getTime() - beforeDay.getTime();
  const days = timeDifference / 86400000;

  if(days>=1){
    return false
  }
  return true;
}
