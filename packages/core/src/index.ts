import applyPlugins from './plugins';
import { blankReplacement, keepReplacement } from './util';
import TurndownService from './lib/turndown';

export class Sitdown {
  defaultOptions: TurndownService.Options;
  service: TurndownService;

  get RootNode() {
    return TurndownService.RootNode;
  }

  constructor(options?: TurndownService.Options) {
    this.defaultOptions = {
      headingStyle: 'atx',
      blankReplacement,
      keepReplacement,
    };
    this.service = new TurndownService({
      ...this.defaultOptions,
      ...options,
    });
    applyPlugins(this.service);
  }

  HTMLToMD(html: string, env?: object) {
    if (env) {
      this.service.options.env = env;
    }
    return this.service.turndown.call(this.service, html);
  }
}

export const RootNode = TurndownService.RootNode;