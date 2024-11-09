

export const getTime = () => {
  const hour = document.getElementById('hour');
  const minutes = document.getElementById('minutes');
  const sec = document.getElementById('sec');

  setInterval(() => {
    const curTime = new Date();

    const curHours = curTime.getHours();
    const curMinutes = curTime.getMinutes();
    const curSeconds = curTime.getSeconds();

    hour.textContent = `${curHours < 10 ? `0${curHours}`: curHours}`;
    minutes.textContent = `${curMinutes < 10 ? `0${curMinutes}`: curMinutes}`;
    sec.textContent = `${curSeconds < 10 ? `0${curSeconds}`: curSeconds}`;
  }, 1000);
}