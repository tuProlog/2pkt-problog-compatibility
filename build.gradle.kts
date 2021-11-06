plugins {
    java
}

val tuprologVersion = "0.20.3"

subprojects {
    apply(plugin="java")

    repositories {
        mavenCentral()
    }

    dependencies {
        implementation("it.unibo.tuprolog:solve-problog-jvm:$tuprologVersion")
        implementation("it.unibo.tuprolog:parser-theory-jvm:$tuprologVersion")
    }
}
