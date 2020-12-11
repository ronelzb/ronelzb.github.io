---
layout: post
title: Code Interview Exercises
subtitle: HackerRank and general code exercises.
gh-repo: ronelzb/code-interview-exercises
gh-badge: [watch, star, fork, follow]
tags: [algorithms, arrays, dynamic-programming, exercises, greedy, hashtable, java, search, sorting, strings]
---

Practical exercises continuation from Cracking The Interview Code. Exercise solutions for problems of different nature on [HackerRank](https://www.hackerrank.com/).

This repo is focus the weekly challenges presented in HackerRank, for each code you can find the problem link at the header and the solution followed below.

Also, there is a couple of code related to the [Interview Cake](https://www.interviewcake.com/) weekly Java-based solutions. Interview cake is a interview tips.

### Dependencies

This project was compiled using [Eclipse](https://www.eclipse.org/downloads/) and the build automation tool Maven. Maven projects are configured using a Project Object Model stored in a `pom.xml`. For example:

```xml
<project>
  <!-- model version is always 4.0.0 for Maven 2.x POMs -->
  <modelVersion>4.0.0</modelVersion>
  <!-- project coordinates, i.e. a group of values which uniquely identify this project -->
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0</version>
  <!-- library dependencies -->
  <dependencies>
    <dependency>
      <!-- coordinates of the required library -->
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <!-- this dependency is only used for running and compiling tests -->
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

The Maven directory structure will be as follows:

| Directory name | Purpose |
|:--------------:|:-------|
| project home | Contains the pom.xml and all subdirectories. |
| src/main/java  | Contains the deliverable Java sourcecode for the project. |
| src/main/resources | Contains the deliverable resources for the project, such as property files. |
| src/test/java | Contains the testing Java sourcecode (JUnit or TestNG test cases, for example) for the project. |
| src/test/resources | Contains resources necessary for testing. |

### HackerRank allowed time complexities

| max n (<=) |  max O(n)  |
|:----------:|:----------:|
|  10..11    | <img src="https://latex.codecogs.com/svg.latex?n!,%20n^6" /> |
|  15..18    | <img src="https://latex.codecogs.com/svg.latex?2^n%20*%20n^2" /> |
|  18..22    | <img src="https://latex.codecogs.com/svg.latex?2^n%20*%20n" /> |
|   100      | <img src="https://latex.codecogs.com/svg.latex?n^4" /> |
|   400      | <img src="https://latex.codecogs.com/svg.latex?n^3" /> |
|    2K      | <img src="https://latex.codecogs.com/svg.latex?n^2%20*%20logn" /> |
|   10K      | <img src="https://latex.codecogs.com/svg.latex?n^3" /> |
|    1M      | <img src="https://latex.codecogs.com/svg.latex?n%20*%20logn" /> |
|   100M     | <img src="https://latex.codecogs.com/svg.latex?n,%20logn" /> |
|   < 100M   | <img src="https://latex.codecogs.com/svg.latex?1" /> |

Click [here](https://github.com/ronelzb/code-interview-exercises/) to see the repository.
