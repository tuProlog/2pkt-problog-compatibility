buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.0.3")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.31")

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

plugins {
    java
}

val tuprologVersion: String by rootProject

subprojects {
    if (project.name != "android") {
        apply(plugin = "java")

        dependencies {
            implementation("it.unibo.tuprolog:solve-problog-jvm:$tuprologVersion")
            implementation("it.unibo.tuprolog:parser-theory-jvm:$tuprologVersion")
        }
    }
}

tasks.maybeCreate("clean", Delete::class.java).run {
    delete(rootProject.buildDir)
}
