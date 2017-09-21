import { Utils } from './utils';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('Utils Make Callback', () => {

  beforeEach(() => {
    this.THIS_SCOPE = false;
    this.fieldOne = false;
    this.fieldTwo = false;
    this.testFunc = function(argOne,argTwo){ 
        this.fieldOne = argOne ;
        this.fieldTwo = argTwo; 
    };
  });


  it('should pass in arguments to wrapped functions on invocation', () => {
    var setFieldOne = Utils.makeCallback(this, this.testFunc);
    setFieldOne(true);
    expect(this.fieldOne).toBeTruthy();
  });

  it('should pass arguments from creation with invoked arguments', () => {
    var setFieldOneAndTwo = Utils.makeCallback(this, this.testFunc, true);
    setFieldOneAndTwo(true);
    expect(this.fieldOne).toBeTruthy();
    expect(this.fieldTwo).toBeTruthy();
  });

  it('invocation Arguments Come First, then creation arguments', () => {
    var setFieldOneAndTwo = Utils.makeCallback(this, this.testFunc, 'creation arg');
    setFieldOneAndTwo('invoke ARG');
    expect(this.fieldOne).toEqual('invoke ARG');
    expect(this.fieldTwo).toEqual('creation arg');
  });

});

describe('get or default', () => {   

    it('return default when null', () => {
        expect(Utils.getOrDefault(null, true)).toBeTruthy();
    });

    it('return default when undefined', () => {
        expect(Utils.getOrDefault(undefined, true)).toBeTruthy();
    });

});