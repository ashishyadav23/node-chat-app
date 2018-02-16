const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate a mesaage', () => {
        var message = {
            from: "Ashish yadav",
            text: "hello testCase"
        };

        var response = generateMessage(message.from, message.text);
        expect(message.from).toBe(response.from);
        expect(message.text).toBe(response.text);
        expect(typeof response.createAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate a correct location object', () => {
        var location = {
            lat: 19.190117,
            lng: 72.8338119,
            url: 'https://www.google.com/maps?q=19.190117,72.8338119'
        };

        var response = generateLocationMessage('Admin', location.lat, location.lng);
        expect(location.url).toEqual(response.url);
    });

});