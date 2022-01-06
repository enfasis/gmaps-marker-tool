const DOOR_INSIDE = 1;
const DOOR_OUTSIDE = 2;
const DOOR_TYPES = {
  [DOOR_INSIDE]: "Interior",
  [DOOR_OUTSIDE]: "Exterior",
};

const DOOR_LOCK_RIM = 1;
const DOOR_LOCK_KNOBS = 2;
const DOOR_LOCK_BOLT = 3;

const DOOR_LOCK_OPTIONS = [
  { value: DOOR_LOCK_RIM, label: "Sobreponer" },
  { value: DOOR_LOCK_KNOBS, label: "Pomo" },
  { value: DOOR_LOCK_BOLT, label: "Tranca" },
];

const DOOR_SPECIAL_DOOR_OUT = 1;
const DOOR_SPECIAL_FRAME_OUT = 2;
const DOOR_SPECIAL_STILL_OUT = 3;
const DOOR_SPECIAL_DOUBLE_HEAD = 4;
const DOOR_SPECIAL_OPTIONS = [
  { value: DOOR_SPECIAL_DOOR_OUT, label: "Retiro Puerta" },
  { value: DOOR_SPECIAL_FRAME_OUT, label: "Retiro Marco" },
  { value: DOOR_SPECIAL_STILL_OUT, label: "Retiro Zocalo" },
  { value: DOOR_SPECIAL_DOUBLE_HEAD, label: "Doble Cabezal" },
];

const ANIMATION_PROPS = {
  variants: {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  },
  initial: "hidden",
  animate: "show",
  exit: "hidden",
};

export {
  ANIMATION_PROPS,
  DOOR_INSIDE,
  DOOR_OUTSIDE,
  DOOR_LOCK_RIM,
  DOOR_LOCK_KNOBS,
  DOOR_LOCK_BOLT,
  DOOR_LOCK_OPTIONS,
  DOOR_SPECIAL_DOOR_OUT,
  DOOR_SPECIAL_FRAME_OUT,
  DOOR_SPECIAL_STILL_OUT,
  DOOR_SPECIAL_DOUBLE_HEAD,
  DOOR_SPECIAL_OPTIONS,
  DOOR_TYPES,
};
