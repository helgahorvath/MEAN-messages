import {Component} from '@angular/core';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  styleUrls: ['post-create.component.css']
})
export class PostCreateComponent {

  constructor(public postsService: PostsService) {}


  onAddPost(form) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.reset();
  }
}
