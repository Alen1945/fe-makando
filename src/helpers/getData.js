import axios from 'axios'

async function getData (dataUrl, dataForm) {
  try {
    console.log(dataForm)
    const url = process.env.REACT_APP_API_URL + dataUrl
    return await axios.get(url, dataForm)
  } catch (e) {
    console.log(e)
  }
}
export default getData
