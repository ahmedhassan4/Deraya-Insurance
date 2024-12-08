"use client";
import React from "react";
import ContentLoader from "react-content-loader";

const ServicesLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={400}
    height={380}
    viewBox="0 0 400 380"
    backgroundColor="#f3f3f3"
    foregroundColor="#492b2b"
    className="loader"
    {...props}
  >
    <rect x="-3" y="190" rx="3" ry="3" width="410" height="6" />
    <rect x="3" y="169" rx="3" ry="3" width="178" height="6" />
    <circle cx="50" cy="50" r="50" />
  </ContentLoader>
);

export default ServicesLoader;
