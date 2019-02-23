import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

// can also be done at app.module.ts / providers, but this way it creates only one instance for the whole app
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title, content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
