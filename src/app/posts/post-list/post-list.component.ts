import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSubscription: Subscription;

  constructor(public postsService: PostsService) {}


  ngOnInit(): void {
    this.postsService.getPosts();
    this.postSubscription = this.postsService.getPostUpdateListener().subscribe((posts) => this.posts = posts);
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  onDelete(id) {
    this.postsService.deletePost(id);
  }

}
