import defaultProjectImage from './assets/default/imagine.jpg';
import defaultProjectHCI from './assets/default/hci.png';
import defaultProjectRobocits from './assets/default/robotics.png';
import defaultProjectVJ from './assets/default/vj.png';
import defaultProjectVA from './assets/default/va.png';
import defaultProjectMR from './assets/default/mr.png';
import defaultPersonImage from './assets/default/circle-user-solid.svg';

const defaultProjectsImages = {
    'default': defaultProjectImage,
    'Human Computer Interaction': defaultProjectHCI,
    'Robotics': defaultProjectRobocits,
    'Video Games': defaultProjectVJ,
    'Visual Analytics': defaultProjectVA,
    'Mixed Realities': defaultProjectMR
};

export { defaultProjectImage as DEFAULT_PROJECT_IMAGE };
export { defaultPersonImage as DEFAULT_PERSON_IMAGE };
export { defaultProjectsImages as DEFAULT_PROJECTS_IMAGES };

/* #TODO Abel: Hacer una imagen placeholder por cada categoría */