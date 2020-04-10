import { sliderReducer, initialState } from './slider.reducer';
import { sliderActions } from './slider.actions';

describe('@keen.io/ui-core - slider reducer', () => {
  it('should update slider "dimension"', () => {
    const dimension = 300;
    const action = sliderActions.setDimension(dimension);
    const state = sliderReducer(initialState, action);

    expect(state.dimension).toEqual(dimension);
  });

  it('should update slider value', () => {
    const value = 150;
    const action = sliderActions.setValue(value);
    const state = sliderReducer(initialState, action);

    expect(state.value).toEqual(value);
  });

  it('should update "drag control" position', () => {
    const position = 30;
    const action = sliderActions.setControlPosition(position);
    const { dragControl } = sliderReducer(initialState, action);

    expect(dragControl.position).toEqual(position);
  });

  it('should update "drag control" moving state', () => {
    const action = sliderActions.setControlDrag(true);
    const { dragControl } = sliderReducer(initialState, action);

    expect(dragControl.moving).toBeTruthy();
  });

  it('should update "drag control" active state', () => {
    const action = sliderActions.setControlState(true);
    const { dragControl } = sliderReducer(initialState, action);

    expect(dragControl.active).toBeTruthy();
  });
});
