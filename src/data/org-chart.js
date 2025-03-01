const Avatar1 = '/assets/images/users/avatar-6.png';
const Avatar2 = '/assets/images/users/avatar-1.png';
// const Avatar3 = '/assets/images/users/avatar-2.png';
// const Avatar5 = '/assets/images/users/avatar-4.png';
// const Avatar6 = '/assets/images/users/avatar-5.png';
// const Avatar7 = '/assets/images/users/avatar-7.png';
// const Avatar8 = '/assets/images/users/avatar-8.png';
// const Avatar9 = '/assets/images/users/avatar-9.png';
// const Avatar10 = '/assets/images/users/avatar-10.png';

// ===========================|| ORGANIZATION CHART - USERS ||=========================== //

export const data = [
  {
    name: 'Tejiri Jesse',
    role: 'CEO',
    avatar: Avatar1,
    linkedin: 'https://www.linkedin.com/',
    facebook: 'https://www.facebook.com/',
    skype: 'https://www.skype.com/en/',
    children: [
      {
        name: 'Joe Rukundo',
        role: 'CTO',
        avatar: Avatar1,
        linkedin: 'https://www.linkedin.com/',
        facebook: 'https://www.facebook.com/',
        skype: 'https://www.skype.com/en/',
        children: [
          {
            name: 'Jeff R.',
            role: 'Controller',
            avatar: Avatar2,
            linkedin: 'https://www.linkedin.com/',
            facebook: 'https://www.facebook.com/',
            skype: 'https://www.skype.com/en/'
          }
        ]
      }
    ]
  }
];
