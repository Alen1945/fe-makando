import axios from 'axios'
import cookie from 'js-cookie'
function submitData (dataUrl, dataForm) {
  const config = {}
  if (cookie.get('tokenm4k4nd0')) {
    config.headers = { Authorization: `Bearer ${cookie.get('tokenm4k4nd0')}` }
  }
  return new Promise((resolve, reject) => {
    const url = process.env.REACT_APP_API_URL + dataUrl
    axios.post(url, dataForm,config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default submitData
