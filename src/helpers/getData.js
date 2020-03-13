import axios from 'axios'

function getData (dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const url = process.env.REACT_APP_API_URL + dataUrl
    axios.get(url, dataForm).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default getData
