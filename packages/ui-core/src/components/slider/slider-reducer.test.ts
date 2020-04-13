import { sliderReducer, initialState } from './slider.reducer';
import { sliderActions } from './slider.actions';

import { DRAG_CONTROL_ID } from './constants';

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
    const action = sliderActions.setControlPosition(DRAG_CONTROL_ID, position);
    const { dragControls } = sliderReducer(initialState, action);

    expect(dragControls[DRAG_CONTROL_ID].position).toEqual(position);
  });

  it('should update "drag control" moving state', () => {
    const action = sliderActions.setControlDrag(DRAG_CONTROL_ID, true);
    const { dragControls } = sliderReducer(initialState, action);

    expect(dragControls[DRAG_CONTROL_ID].moving).toBeTruthy();
  });

  it('should update "drag control" active state', () => {
    const action = sliderActions.setControlState(DRAG_CONTROL_ID, true);
    const { dragControls } = sliderReducer(initialState, action);

    expect(dragControls[DRAG_CONTROL_ID].active).toBeTruthy();
  });
});
