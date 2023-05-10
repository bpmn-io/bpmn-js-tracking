import {
  getEventType
} from 'lib/trackingModules/Util';


describe('Util', function() {

  describe('#getEventType', function() {

    it('KeyboardEvent', function() {

      // given
      const event = new KeyboardEvent('keydown', { key: 'a' });

      // expect
      expect(getEventType(event)).to.equal('keyboard');
    });


    it('PointerEvent', function() {

      // given
      const event = new PointerEvent('pointerdown', { pointerType: 'mouse' });

      // expect
      expect(getEventType(event)).to.equal('click');
    });


    it('DragEvent', function() {

      // given
      const event = new DragEvent('dragstart');

      // expect
      expect(getEventType(event)).to.equal('drag');
    });

  });


});