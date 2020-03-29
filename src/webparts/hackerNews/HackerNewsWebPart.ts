import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Version } from '@microsoft/sp-core-library'
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base'
import HackerNews from './components/HackerNews'
import { IHackerNewsProps } from './components/IHackerNewsProps'

export interface IHackerNewsWebPartProps {
}

export default class HackerNewsWebPart extends BaseClientSideWebPart <IHackerNewsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IHackerNewsProps> = React.createElement(HackerNews)

    ReactDom.render(element, this.domElement)
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement)
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0')
  }
}
