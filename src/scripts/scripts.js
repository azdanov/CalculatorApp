const $input = document.querySelector('.input')
const $output = document.querySelector('.output')
const evaluate = exprEval.Parser.evaluate // Use cdn
const precision = 100000
let mathBuffer = ''

function updateMathBuffer (symbol) {
  if (symbol === 'DEL') {
    mathBuffer = mathBuffer.slice(0, -1)
    $input.textContent = mathBuffer

    if (mathBuffer.length === 0) {
      $output.textContent = ''
    }
    return
  } else if (symbol === 'AC') {
    mathBuffer = ''
    $input.textContent = ''
    $output.textContent = ''
    return
  }

  const operations = ['/', '*', '-', '+', '%']
  if (operations.includes(mathBuffer[mathBuffer.length - 1])) {
    if (mathBuffer[(mathBuffer.length - 1)] === symbol) {
      return
    } else if (operations.includes(symbol)) {
      mathBuffer = mathBuffer.slice(0, -1)
    }
  }

  mathBuffer += symbol
  $input.textContent = mathBuffer
}

function evaluateMathBuffer () {
  let result
  try {
    result = Math.round(evaluate(mathBuffer) * precision) / precision
  } catch (err) {
    $input.classList.add('error')
    window.setTimeout(() => $input.classList.remove('error'), 100)
    return
  }
  $input.textContent = result
  $output.textContent = mathBuffer
  mathBuffer = result.toString()
}

Array.from(document.querySelectorAll('[data-symbol]')).forEach((item) => {
  item.addEventListener('click', (event) => {
    const symbol = event.currentTarget.dataset.symbol
    if (symbol === '=') {
      evaluateMathBuffer()
    } else {
      updateMathBuffer(symbol)
    }
  })
})
