'use strict';

module.exports = function(Compute) {
	Compute.data = function(yr, val, cb) {
		var dt = new Date();
		var cyear = dt.getFullYear();
		var resYear = cyear - yr;
		var yrDeduct;
		
		if (resYear == 0) {
			yrDeduct = 0;
		} else {			
			if (val >= 1020000) {
				yrDeduct = 83700 * resYear;			
			} else {
				yrDeduct = 42000 * resYear;
			
			}
		}
		
		var value = val - yrDeduct;
		cb(null, value);
  };
  Compute.remoteMethod(
    'data',
    {
      accepts: [
      { arg: 'year', type: 'number', required: true },
      { arg: 'value', type: 'number', required: true }
    ],
      returns: {arg: 'value', type: 'number'},
      http: {path:'/data', verb: 'get'}
    }
  );
};
