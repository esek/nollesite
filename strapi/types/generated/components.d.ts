import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentCalendar extends Schema.Component {
  collectionName: 'components_content_calendars';
  info: {
    displayName: 'calendar';
    icon: 'calendar-alt';
    description: '';
  };
  attributes: {
    calendarUrl: Attribute.String & Attribute.Required;
    showInMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface ContentContact extends Schema.Component {
  collectionName: 'components_content_contacts';
  info: {
    displayName: 'contact';
    icon: 'paper-plane';
    description: '';
  };
  attributes: {
    email: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'likabehandling@esek.se'>;
    showInMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    title: Attribute.String;
  };
}

export interface ContentGroup extends Schema.Component {
  collectionName: 'components_content_groups';
  info: {
    displayName: 'group';
    icon: 'user-astronaut';
    description: '';
  };
  attributes: {
    group: Attribute.Relation<'content.group', 'oneToOne', 'api::group.group'>;
    groups: Attribute.Relation<
      'content.group',
      'oneToMany',
      'api::group.group'
    >;
  };
}

export interface ContentImageWithText extends Schema.Component {
  collectionName: 'components_content_image_with_texts';
  info: {
    displayName: 'ImageWithText';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
    description: Attribute.Text;
    reverse: Attribute.Boolean;
    showInMenu: Attribute.Boolean;
  };
}

export interface ContentImage extends Schema.Component {
  collectionName: 'components_content_image';
  info: {
    displayName: 'image';
    icon: 'image';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    imageText: Attribute.String;
  };
}

export interface ContentImages extends Schema.Component {
  collectionName: 'components_content_images';
  info: {
    displayName: 'images';
    icon: 'images';
    description: '';
  };
  attributes: {
    images: Attribute.Component<'content.image', true>;
    title: Attribute.String;
    showInMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface ContentMission extends Schema.Component {
  collectionName: 'components_content_mission';
  info: {
    displayName: 'mission';
    icon: 'briefcase';
  };
  attributes: {
    name: Attribute.String;
    points: Attribute.Integer;
  };
}

export interface ContentNolleguide extends Schema.Component {
  collectionName: 'components_content_nolleguides';
  info: {
    displayName: 'nolleguide';
    icon: 'file-pdf';
  };
  attributes: {
    downloadText: Attribute.String & Attribute.Required;
    file: Attribute.Media & Attribute.Required;
  };
}

export interface ContentNollekamp extends Schema.Component {
  collectionName: 'components_content_nollekamp';
  info: {
    displayName: 'nollekamp';
    icon: 'trophy';
    description: '';
  };
  attributes: {
    missions: Attribute.Component<'content.mission', true>;
    showPoints: Attribute.Boolean & Attribute.DefaultTo<true>;
    description: Attribute.RichText;
    standings: Attribute.Component<'content.standings', true>;
    showInMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface ContentPhaddergroups extends Schema.Component {
  collectionName: 'components_content_phaddergroups';
  info: {
    displayName: 'phaddergroups';
    icon: 'users';
    description: '';
  };
  attributes: {
    groups: Attribute.Relation<
      'content.phaddergroups',
      'oneToMany',
      'api::group.group'
    >;
    showInMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface ContentPhos extends Schema.Component {
  collectionName: 'components_content_phos';
  info: {
    displayName: 'ph\u00F8s';
    icon: 'user-secret';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.RichText & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface ContentPhoset extends Schema.Component {
  collectionName: 'components_content_phoset';
  info: {
    displayName: 'ph\u00F8set';
    icon: 'user-secret';
    description: '';
  };
  attributes: {
    phoset: Attribute.Component<'content.phos', true>;
    showInMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface ContentSponsor extends Schema.Component {
  collectionName: 'components_content_sponsor';
  info: {
    displayName: 'sponsor';
    icon: 'money-bill';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    description: Attribute.RichText;
  };
}

export interface ContentSponsors extends Schema.Component {
  collectionName: 'components_content_sponsors';
  info: {
    displayName: 'sponsors';
    icon: 'money-bill';
    description: '';
  };
  attributes: {
    sponsors: Attribute.Component<'content.sponsor', true>;
    showInMenu: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface ContentStandings extends Schema.Component {
  collectionName: 'components_content_standings';
  info: {
    displayName: 'standings';
    icon: 'bars';
    description: '';
  };
  attributes: {
    points: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    group: Attribute.Relation<
      'content.standings',
      'oneToOne',
      'api::group.group'
    >;
  };
}

export interface ContentText extends Schema.Component {
  collectionName: 'components_content_text';
  info: {
    displayName: 'text';
    icon: 'align-center';
    description: '';
  };
  attributes: {
    header: Attribute.String;
    body: Attribute.RichText;
    showInMenu: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.calendar': ContentCalendar;
      'content.contact': ContentContact;
      'content.group': ContentGroup;
      'content.image-with-text': ContentImageWithText;
      'content.image': ContentImage;
      'content.images': ContentImages;
      'content.mission': ContentMission;
      'content.nolleguide': ContentNolleguide;
      'content.nollekamp': ContentNollekamp;
      'content.phaddergroups': ContentPhaddergroups;
      'content.phos': ContentPhos;
      'content.phoset': ContentPhoset;
      'content.sponsor': ContentSponsor;
      'content.sponsors': ContentSponsors;
      'content.standings': ContentStandings;
      'content.text': ContentText;
    }
  }
}
