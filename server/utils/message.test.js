const expect = require('expect');
var { generateMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate a mesaage', () => {
        var message = {
            from: "Ashish yadav",
            text: "hello testCase"
        }

        var response = generateMessage(message.from, message.text);
        expect(message.from).toBe(response.from);
        expect(message.text).toBe(response.text);
        expect(message).toBinclude(response.text);
        expect(typeof response.createAt).toBe('number');
    })
})