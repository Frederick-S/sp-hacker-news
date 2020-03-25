import * as React from 'react'
import { IHackerNewsProps } from './IHackerNewsProps'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { Pivot, PivotItem, IPivotStyles } from 'office-ui-fabric-react/lib/Pivot'
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling'

const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
  root: {
    textAlign: 'center'
  }
}

export default class HackerNews extends React.Component<IHackerNewsProps, {}> {
  public render(): React.ReactElement<IHackerNewsProps> {
    return (
      <Pivot aria-label="Hacker News" styles={pivotStyles}>
        <PivotItem
          headerText="Top"
          headerButtonProps={{
            'data-order': 1
          }}
        >
          <Label>Pivot #1</Label>
        </PivotItem>
        <PivotItem
          headerText="New"
          headerButtonProps={{
            'data-order': 2
          }}
        >
          <Label>Pivot #2</Label>
        </PivotItem>
      </Pivot>
    )
  }
}
