import ArrowUp from './arrow-up.component';
import ArrowDown from './arrow-down.component';
import AreaWidget from './area-widget.component';
import ButtonArrow from './button-arrow.component';
import ButtonArrowLeft from './button-arrow-left.component';
import Brand from './brand.component';
import BarHorizontal from './bar-horizontal.component';
import BarVertical from './bar-vertical.component';
import CaretLeft from './caret-left.component';
import CaretRight from './caret-right.component';
import CaretUp from './caret-up.component';
import CaretDown from './caret-down.component';
import Close from './close.component';
import CornerTick from './corner-tick.component';
import DonutWidget from './donut-widget.component';
import QuestionMark from './question-mark.component';
import EyeSolid from './eye-solid.component';
import EyeOutline from './eye-outline.component';
import EyeSlashSolid from './eye-slash-solid.component';
import FunnelVertical from './funnel-vertical.component';
import FunnelHorizontal from './funnel-horizontal.component';
import GaugeWidget from './gauge-widget.component';
import HeatmapWidget from './heatmap-widget.component';
import UserSolid from './user-solid.component';
import UserOutline from './user-outline.component';
import UsersSolid from './users-solid.component';
import UsersOutline from './users-outline.component';
import ClickSolid from './click-solid.component';
import ClickOutline from './click-outline.component';
import CursorSolid from './cursor-solid.component';
import CursorOutline from './cursor-outline.component';
import Check from './check.component';
import Line from './line.component';
import LineWidget from './line-widget.component';
import ChurnMoneyOutline from './churn-money-outline.component';
import ChurnMoneySolid from './churn-money-solid.component';
import ChurnOutline from './churn-outline.component';
import ChurnSolid from './churn-solid.component';
import MoneyOutline from './money-outline.component';
import MoneySolid from './money-solid.component';
import MetricWidget from './metric-widget.component';
import Info from './info.component';
import Json from './json.component';
import LockOpen from './lock-open.component';
import LockClosed from './lock-closed.component';
import Table from './table.component';
import Temperature from './temperature.component';
import PieWidget from './pie-widget.component';
import Search from './search.component';
import Actions from './actions.component';
import Settings from './settings.component';

import { IconType } from '../types';

export const getIcon = (type: IconType) => {
  switch (type) {
    case 'arrow-down':
      return ArrowDown;
    case 'arrow-up':
      return ArrowUp;
    case 'area-widget':
      return AreaWidget;
    case 'bar-widget-horizontal':
      return BarHorizontal;
    case 'bar-widget-vertical':
      return BarVertical;
    case 'button-arrow':
      return ButtonArrow;
    case 'button-arrow-left':
      return ButtonArrowLeft;
    case 'caret-down':
      return CaretDown;
    case 'caret-up':
      return CaretUp;
    case 'caret-left':
      return CaretLeft;
    case 'caret-right':
      return CaretRight;
    case 'check':
      return Check;
    case 'close':
      return Close;
    case 'donut-widget':
      return DonutWidget;
    case 'line':
      return Line;
    case 'line-widget':
      return LineWidget;
    case 'info':
      return Info;
    case 'json':
      return Json;
    case 'brand':
      return Brand;
    case 'question-mark':
      return QuestionMark;
    case 'click-solid':
      return ClickSolid;
    case 'click-outline':
      return ClickOutline;
    case 'cursor-solid':
      return CursorSolid;
    case 'cursor-outline':
      return CursorOutline;
    case 'corner-tick':
      return CornerTick;
    case 'eye-solid':
      return EyeSolid;
    case 'eye-outline':
      return EyeOutline;
    case 'eye-slash-solid':
      return EyeSlashSolid;
    case 'funnel-widget-horizontal':
      return FunnelHorizontal;
    case 'funnel-widget-vertical':
      return FunnelVertical;
    case 'gauge-widget':
      return GaugeWidget;
    case 'heatmap-widget':
      return HeatmapWidget;
    case 'user-solid':
      return UserSolid;
    case 'user-outline':
      return UserOutline;
    case 'users-solid':
      return UsersSolid;
    case 'users-outline':
      return UsersOutline;
    case 'churn-money-outline':
      return ChurnMoneyOutline;
    case 'churn-money-solid':
      return ChurnMoneySolid;
    case 'churn-outline':
      return ChurnOutline;
    case 'churn-solid':
      return ChurnSolid;
    case 'metric-widget':
      return MetricWidget;
    case 'money-outline':
      return MoneyOutline;
    case 'money-solid':
      return MoneySolid;
    case 'lock-open':
      return LockOpen;
    case 'lock-closed':
      return LockClosed;
    case 'pie-widget':
      return PieWidget;
    case 'temperature':
      return Temperature;
    case 'search':
      return Search;
    case 'table-widget':
      return Table;
    case 'actions':
      return Actions;
    case 'settings':
      return Settings;
  }
};
