//Definition type script file

import {object} from 'prop-types'

export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string,
    image: string
  }
  comments: [Comment];
  description: string;
  mainImage: {
    assets: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: [object]
}

export interface CurrentPost {
  post: {
    _id: string;
    title: string;
    description: string;
    author: {
      name: string;
      image: string
    }
    mainImage: {
      assets: {
        url: string
      }
    }
    _createdAt: string
    body: [object]
    comments: [Comment]
  }
}


export interface PostsOnly {
  id: string
  link: string
  imgUrl: any
  desc: string
  title: string
  body: [object]
  created: string
  author: {
    name: string
    image: string
  }

}
export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  }
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export interface FormValues {
  _id: string;
  name: string;
  //optional type = name?:string {not required}
  email: string;
  comment: string;

}

export interface State {
  current: boolean
}

export interface Props {
  post: [Post] //post=[];
}