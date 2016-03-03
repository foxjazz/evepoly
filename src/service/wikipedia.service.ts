import {Injectable} from 'angular2/core';
import {URLSearchParams, Jsonp} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class WikipediaService {
  constructor(private jsonp: Jsonp) {}

  search(terms: Observable<string>, debounceDuration = 250) {
    return terms.debounceTime(debounceDuration)
                .distinctUntilChanged()
                .switchMap(term => this.rawSearch(<string>term));
  }

  rawSearch (term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
                .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
                .map((request) => request.json()[1]);
  }
}
