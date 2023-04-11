import {
  isTrackingModuleEnabled
} from 'src/trackingModules/Util';


describe('Util', function() {

  describe('#isTrackingModuleEnabled', function() {

    it('no config', function() {

      // given
      const config = null;

      // expect
      expect(isTrackingModuleEnabled(config, 'foo')).to.be.true;
    });


    it('blacklist', function() {

      // given
      const config = { blacklist: [ 'foo' ] };

      // expect
      expect(isTrackingModuleEnabled(config, 'foo')).to.be.false;
    });


    it('whitelist - included', function() {

      // given
      const config = { whitelist: [ 'foo' ] };

      // expect
      expect(isTrackingModuleEnabled(config, 'foo')).to.be.true;
    });


    it('whitelist - not included', function() {

      // given
      const config = { whitelist: [ '' ] };

      // expect
      expect(isTrackingModuleEnabled(config, 'foo')).to.be.false;
    });

  });

});