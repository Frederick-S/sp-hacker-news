import * as React from 'react'
import { IHackerNewsProps } from './IHackerNewsProps'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { List } from 'office-ui-fabric-react/lib/List'
import { Pivot, PivotItem, IPivotStyles } from 'office-ui-fabric-react/lib/Pivot'
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling'
import axios from 'axios'
import FeedItem from '../data/FeedItem'

const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
  root: {
    textAlign: 'center'
  }
}

interface IState {
  news: FeedItem[]
}

export default class HackerNews extends React.Component<IHackerNewsProps, IState> {
  constructor(props) {
    super(props)

    this.state = {
      news: []
    }
  }

  public render(): React.ReactElement<IHackerNewsProps> {
    const { news } = this.state

    return (
      <Pivot aria-label="Hacker News" styles={pivotStyles}>
        <PivotItem
          headerText="News"
          headerButtonProps={{
            'data-order': 1
          }}
        >
          <List items={news} onRenderCell={this.onRenderCell}></List>
        </PivotItem>
        <PivotItem
          headerText="Newest"
          headerButtonProps={{
            'data-order': 2
          }}
        >
          <Label>Pivot #2</Label>
        </PivotItem>
      </Pivot>
    )
  }

  componentDidMount() {
    axios.get('https://api.hnpwa.com/v0/news/1.json')
      .then(response => {
        this.setState({
          news: response.data
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  private onRenderCell(item: FeedItem, index: number | undefined): JSX.Element {
    return (
      <div>
        <div>{item.title}</div>
      </div>
    )
  }
}
