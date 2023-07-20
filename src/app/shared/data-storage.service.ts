import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";    

// import { Recipe } from '../recipes/recipe.model'; // removed
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      return this.http.put('https://ng-course-recipe-book-83125-default-rtdb.firebaseio.com/recipes.json', recipes);
    }
}


/// ******************  