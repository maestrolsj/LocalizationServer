import React from "react";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

type Paths = Array<{
  name: String;
  path?: String;
}>;

interface CustomBreadcrumbsProps {
  paths: Paths;
}

export const CustomBreadcrumbs: React.SFC<CustomBreadcrumbsProps> = ({
  paths,
}) => {
  const history = useHistory();
  const handleClick = useCallback(
    (path) => {
      return () => history.push(path);
    },
    [history]
  );
  return (
    <Breadcrumbs>
      {paths.length > 1
        ? paths
            .filter((i, ind) => ind !== paths.length - 1)
            .map((i, ind) => (
              <Link key={ind} color="inherit" onClick={handleClick(i.path)}>
                {i.name}
              </Link>
            ))
        : null}
      {paths.length > 0 ? (
        <Typography color="textPrimary">
          {paths[paths.length - 1].name}
        </Typography>
      ) : null}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
