/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function getweather(cityCode) {
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {
      city: cityCode,
    }
  }).then(result => {
    const wobj = result.data
    const dataStr = ` <span class="dateShort">${wobj.date}</span>
  <span class="calendar">农历&nbsp;
    <span class="dateLunar">${wobj.dateLunar}</span>
  </span>`
    document.querySelector('.title').innerHTML = dataStr
    document.querySelector('.area').innerHTML = wobj.area
    document.querySelector('.weather-box').innerHTML = `<div class="tem-box">
<span class="temp">
  <span class="temperature">${wobj.temperature}</span>
  <span>°</span>
</span>
</div>
<div class="climate-box">
<div class="air">
  <span class="psPm25">${wobj.psPm25}</span>
  <span class="psPm25Level">${wobj.psPm25Level}</span>
</div>
<ul class="weather-list">
  <li>
    <img src=${wobj.weatherImg} class="weatherImg" alt="">
    <span class="weather">${wobj.weather}</span>
  </li>
  <li class="windDirection">${wobj.windDirection}</li>
  <li class="windPower">${wobj.windPower}</li>
</ul>
</div>`
    const twobj = wobj.todayWeather
    document.querySelector('.today-weather').innerHTML = `<div class="range-box">
<span>今天：</span>
<span class="range">
  <span class="weather">${wobj.weather}</span>
  <span class="temNight">${twobj.temNight}</span>
  <span>-</span>
  <span class="temDay">${twobj.temDay}</span>
  <span>℃</span>
</span>
</div>
<ul class="sun-list">
<li>
  <span>紫外线</span>
  <span class="ultraviolet">${twobj.ultraviolet}</span>
</li>
<li>
  <span>湿度</span>
  <span class="humidity">${twobj.humidity}</span>%
</li>
<li>
  <span>日出</span>
  <span class="sunriseTime">${twobj.sunriseTime}</span>
</li>
<li>
  <span>日落</span>
  <span class="sunsetTime">${twobj.sunsetTime}</span>
</li>
</ul>`
    const dayForecast = wobj.dayForecast
    const dayForecastStr = dayForecast.map(item => {
      return `<li class="item">
  <div class="date-box">
    <span class="dateFormat">${item.dateFormat}</span>
    <span class="date">${item.date}</span>
  </div>
  <img src=${item.weatherImg} alt="" class="weatherImg">
  <span class="weather">${item.weather}</span>
  <div class="temp">
    <span class="temNight">${item.temNight}</span>-
    <span class="temDay">${item.temDay}</span>
    <span>℃</span>
  </div>
  <div class="wind">
    <span class="windDirection">${item.windDirection}</span>
    <span class="windPower">${item.windPower}</span>
  </div>
</li>`
    }).join('')
    document.querySelector('.week-wrap').innerHTML = dayForecastStr
  })

}
getweather('110100')
document.querySelector('.search-city').addEventListener('input', (e) => {
  console.log(e.target.value);
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value
    }
  }).then(result => {
    const liStr = result.data.map(item => {
      return `<li class="city-item" data-code='${item.code}'>${item.name}</li>`
    }).join('')
    document.querySelector('.search-list').innerHTML = liStr
  })

})

document.querySelector('.search-list').addEventListener('click', e => {
  if (e.target.classList.contains('city-item')) {
    const cityCodes = e.target.dataset.code
    console.log(cityCodes);
    getweather(cityCodes)
  }
})

document.querySelector('#change').addEventListener('change', async e => {
  // console.log(e.target.files[0]);
  const fd = new FormData()
  fd.append('img', e.target.files[0])
  const res = await axios({
    url: 'http://hmajax.itheima.net/api/uploadimg',
    method: 'post',
    data: fd
  })
  document.body.style.backgroundImage = `url('${res.data.data.url}')`
})