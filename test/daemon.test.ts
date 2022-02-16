
describe('intervalHandler', () => {
  it('Does an operation n times', () => {
    setInterval(console.log, 1000, 'foo')
    console.log('bar')
  })  
})

