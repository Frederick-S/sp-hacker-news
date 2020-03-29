import * as React from 'react'
import { IHackerNewsProps } from './IHackerNewsProps'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { List } from 'office-ui-fabric-react/lib/List'
import { Link } from 'office-ui-fabric-react/lib/Link'
import { Pivot, PivotItem, IPivotStyles } from 'office-ui-fabric-react/lib/Pivot'
import { IStyleSet, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import axios from 'axios'
import FeedItem from '../data/FeedItem'

const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
  root: {
    textAlign: 'center'
  }
}

interface IClassNames {
  header: string
  domain: string
  list: string
  feed: string
  meta: string
}

const classNames: IClassNames = mergeStyleSets({
  header: {
    textAlign: 'center'
  },
  domain: {
    marginLeft: 5
  },
  list: {
    margin: 10
  },
  feed: {
    marginTop: 10,
    marginBottom: 10
  },
  meta: {
    fontSize: 12,
    color: 'gray'
  }
})

interface IState {
  top: FeedItem[]
  loading: boolean
}

export default class HackerNews extends React.Component<IHackerNewsProps, IState> {
  constructor(props) {
    super(props)

    this.state = {
      top: [],
      loading: true
    }
  }

  public render(): React.ReactElement<IHackerNewsProps> {
    const { top, loading } = this.state
    const items = [
      {
        key: 'top',
        title: 'Top',
        data: top
      },
      {
        key: 'new',
        title: 'New',
        data: []
      }
    ]

    return (
      <Pivot aria-label="Hacker News" styles={pivotStyles}>
        {
          items.map((item) => {
            return <PivotItem headerText={item.title} key={item.key}>
              {
                loading ? <Spinner size={SpinnerSize.large}></Spinner> : <List items={item.data} onRenderCell={this.onRenderCell} className={classNames.list}></List>
              }
            </PivotItem>
          })
        }
      </Pivot>
    )
  }

  public componentDidMount() {
    axios.get('https://api.hnpwa.com/v0/news/1.json')
      .then(response => {
        this.setState({
          top: response.data,
          loading: false
        })
      })
      .catch(error => {
        console.error(error)

        this.setState({
          loading: false
        })
      })
  }

  private onRenderCell(item: FeedItem, index: number | undefined): JSX.Element {
    return (
      <div className={classNames.feed}>
        <div>
          <Link href={item.url} target="_blank">{item.title}</Link>
          {
            item.domain ? <span className={classNames.domain}>({item.domain})</span> : ''
          }
        </div>
        <div className={classNames.meta}>
          <span>
            {item.points} points by {item.user} {item.time_ago} | {item.comments_count} {item.comments_count > 1 ? 'comments' : 'comment'}
          </span>
        </div>
      </div>
    )
  }
}
