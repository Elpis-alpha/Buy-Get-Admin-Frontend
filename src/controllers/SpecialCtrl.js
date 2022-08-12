export const randomAmong = (num1, num2) => {

  return (Math.floor(Math.random() * (num2 - num1 + 1))) + num1

}

export const chooseFrom = (arr) => {

  return arr[randomAmong(0, (arr.length - 1))]

}

export const shuffle = (arr) => {

  let array = arr.slice()

  for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];

  }

  return array

}

export const heightAspect = (element, ratio) => {

  window.addEventListener('resize', () => {

    element.style.height = (element.offsetWidth * ratio) + 'px'

  })

}

export const OHeightAspect = (element, ratio) => {

  element.style.height = (element.offsetWidth * ratio) + 'px'

}

export const getCookie = (name) => {

  let cookieValue = null;

  if (document.cookie && document.cookie !== '') {

    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {

      const cookie = cookies[i].trim();

      // Does this cookie string begin with the name we want?

      if (cookie.substring(0, name.length + 1) === (name + '=')) {

        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

        break;

      }

    }

  }

  return cookieValue;

}

export const urlify = (text) => {

  var urlRegex = /bats/ig
  // var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

  return text.replace(urlRegex, function (url) {

    return '<a target="_blank" href="' + url + '">' + url + '</a>';

  })

}

export const replaceAsync = async (str, regex, asyncFn) => {

  const promises = [];

  // @ts-ignore
  str.replace(regex, (match, ...args) => {

    const promise = asyncFn(match, ...args);

    promises.push(promise);

  });

  const data = await Promise.all(promises);

  return str.replace(regex, () => data.shift());

}

export const copyText = async (text) => {

  const textArea = document.createElement('textarea')

  textArea.style.position = 'fixed'

  textArea.style.top = '0'

  textArea.style.bottom = '0'

  textArea.style.width = '2rem'

  textArea.style.height = '2rem'

  textArea.style.padding = '0'

  textArea.style.border = 'none'

  textArea.style.overflow = 'hidden'

  textArea.style.opacity = '0'

  textArea.style.outline = 'none'

  textArea.style.boxShadow = 'none'

  textArea.style.background = 'transparent'

  document.body.appendChild(textArea)

  textArea.focus()

  textArea.select()

  await navigator.clipboard.writeText(text)

  document.execCommand('copy')

  textArea.remove()

}


export const scrollThrough = (vertical, horisontal = 0) => {

  window.scrollBy({ top: vertical, left: horisontal, behavior: 'smooth' });

}

export const addNumbers = async (from, to, element, interval, increment = 1) => {

  // Set increment to 1 if not number
  increment = typeof increment !== 'number' ? 1 : increment

  // Set increment to 1 if zero
  increment = increment === 0 ? 1 : increment

  // Set increment to positive or negative based on {from} and {to}
  increment = to > from ? (increment > 0 ? increment : -increment) : (increment > 0 ? -increment : increment)

  const reVal = await new Promise((resolve, reject) => {

    element.innerHTML = from.toString()

    let preVal = from

    let inx = setInterval(() => {

      let newNumb

      if (parseInt(element.innerHTML) === to) { clearInterval(inx); newNumb = '`.-x-`.' }

      if (parseInt(element.innerHTML) !== preVal) { clearInterval(inx); newNumb = '`.-y-`.' }

      const terminal = increment > 0 ? (preVal + increment) >= to : (preVal - increment) <= to

      // console.log(preVal - );

      if (newNumb === '`.-x-`.') {

        resolve('finished')

      } else if (newNumb === '`.-y-`.') {

        resolve('interrupted')

      } else if (terminal === true) {

        newNumb = to

        element.innerHTML = newNumb.toString()

        preVal = newNumb

      } else if (terminal === false) {

        newNumb = parseInt(element.innerHTML) + increment

        element.innerHTML = newNumb.toString()

        preVal = newNumb

      } else {

        clearInterval(inx)

        reject('Unknown')

      }

    }, interval);

  })

  return reVal

}

export const addLetters = async (phrase, element, interval, toNfro, end) => {

  element.innerHTML = ''

  let theText = element.innerHTML

  end = end === undefined ? '' : end

  let full = false

  const nphrase = phrase

  let number = 0

  const reVal = await new Promise((resolve, reject) => {

    let inx = setInterval(() => {

      let newPhrase

      if (element.innerHTML === (phrase + end)) { newPhrase = '`.-x-`.' }


      // Checks if the phrase has once been completed
      if (full === true) {

        full = true

      } else {

        if (newPhrase === '`.-x-`.') { full = true }

      }



      // Checks if another same operation is running and terminates older one
      let otherText = element.innerHTML; let over = false;

      if (full === false) {

        if (theText !== element.innerHTML) { clearInterval(inx); over = true; resolve('interrupted') }

      }


      // Checks if dev wants it to go to and fro and if completed
      if (full === true && toNfro === 0) {

        clearInterval(inx);

        resolve('finished')

      } else {

        // Check if first stage has completed
        if (full === false) {

          element.innerHTML = nphrase.slice(0, number) + end;

          number++

        } else {

          if (number > 0) {

            // Set timeout for second stage based on toNfro
            setTimeout(() => {

              number--

              if (number >= 0) {

                if (theText !== element.innerHTML) { clearInterval(inx); over = true; resolve('finished'); }

                otherText = element.innerHTML

                element.innerHTML = nphrase.slice(0, number) + end

                if (over === true) { element.innerHTML = otherText; }

                theText = element.innerHTML;

              }


            }, toNfro);

          } else {

            clearInterval(inx)

            resolve('finished')

          }

        }

      }

      if (full === false) {

        if (over === true) { element.innerHTML = otherText; }

        theText = element.innerHTML;

      }

    }, interval);

  })

  return reVal

}

export const togglePassword = (passwordInput, toggler, state) => {

  if (passwordInput.type === "password") {

    if (passwordInput.parentElement) passwordInput.parentElement.classList.remove('showing-text')

    if (passwordInput.parentElement) passwordInput.parentElement.classList.add('showing-password')

  } else {

    if (passwordInput.parentElement) passwordInput.parentElement.classList.remove('showing-password')

    if (passwordInput.parentElement) passwordInput.parentElement.classList.add('showing-text')

  }

  if (state === "hover") {

    toggler.addEventListener('mouseover', () => {

      passwordInput.type = 'text'

      if (passwordInput.parentElement) passwordInput.parentElement.classList.remove('showing-password')

      if (passwordInput.parentElement) passwordInput.parentElement.classList.add('showing-text')

    })

    toggler.addEventListener('mouseout', () => {

      passwordInput.type = 'password'

      if (passwordInput.parentElement) passwordInput.parentElement.classList.remove('showing-text')

      if (passwordInput.parentElement) passwordInput.parentElement.classList.add('showing-password')

    })


  } else if (state === "click") {

    toggler.addEventListener("click", (e) => {

      e.preventDefault();

      if (passwordInput.type === "password") {

        passwordInput.type = 'text'

        if (passwordInput.parentElement) passwordInput.parentElement.classList.remove('showing-password')

        if (passwordInput.parentElement) passwordInput.parentElement.classList.add('showing-text')

      } else {

        passwordInput.type = 'password'

        if (passwordInput.parentElement) passwordInput.parentElement.classList.remove('showing-text')

        if (passwordInput.parentElement) passwordInput.parentElement.classList.add('showing-password')

      }

    })

  }

}

export const capitalize = (str) => {

  return str.charAt(0).toLocaleUpperCase() + str.slice(1);

}

export const apostrophifyName = (name) => {

  const end = name.length - 1

  if (name[end] === 's') return name + "'"

  else return name + "'s"

}

export const reformImage = (e, removeNext = true) => {

  const smallSize = e.currentTarget

  const fullSize = new Image()

  fullSize.src = smallSize.src.split('/').filter((value) => value !== 'blur').join('/')

  fullSize.onload = () => {

    try {

      fullSize.alt = smallSize.alt

      fullSize.title = smallSize.title

      if (smallSize.nextElementSibling && removeNext) smallSize.nextElementSibling.remove()

      smallSize.replaceWith(fullSize)

    } catch (error) {

      console.log(error);

    }

  }

}

export const getQueryObject = (href = window?.location?.href) => {

  const params = (new URL(href)).searchParams;

  const urlParams = {}

  // @ts-ignore
  for (let p of params) {

    urlParams[p[0]] = p[1]

  }

  return urlParams

}

export const createQueryString = (queryObject) => {

  let queryString = "?"

  const queryKeys = Object.keys(queryObject).filter((key) => queryObject[key])

  for (const queryName of queryKeys) {

    const queryValue = queryObject[queryName];

    if (queryKeys.indexOf(queryName) === 0) {

      queryString = queryString + encodeURI(`${queryName}=${queryValue}`)

    } else {

      queryString = queryString + encodeURI(`&${queryName}=${queryValue}`)

    }

  }

  return queryString

}
