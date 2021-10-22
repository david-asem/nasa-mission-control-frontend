import { useMemo } from "react";
import { 
  withStyles,
  Appear,
  Link,
  Paragraph,
  Table,
  Words,
} from "arwes";

import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

const Upcoming = props => {
  const { 
    entered,
    launches,
    classes,
    abortLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <Clickable style={{color:"red"}}>
              <Link className={classes.link} onClick={() => abortLaunch(launch.flightNumber)}>
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.missionName}</td>
          <td>{launch.rocketType}</td>
          <td>{launch.destinationPlanet}</td>
        </tr>;
      });
  }, [launches, abortLaunch, classes.link]);

  return <Appear id="upcoming" animate show={entered}>
    <Paragraph>Upcoming missions including both SpaceX launches and newly scheduled NASA rockets.</Paragraph>
    <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>
    <Table animate show={entered}>
      <table style={{tableLayout: "relative"}}>
        <thead>
          <tr>
            <th style={{width: "3rem"}}></th>
            <th style={{width: "3rem"}}>Flight No.</th>
            <th style={{width: "10rem"}}>Launch Date</th>
            <th style={{width: "11rem"}}>Mission Name</th>
            <th style={{width: "11rem"}}>Rocket Type</th>
            <th>Destination Planet</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </Table>
  </Appear>;
}

export default withStyles(styles)(Upcoming);