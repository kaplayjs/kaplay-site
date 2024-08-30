---
title: Calculus
description: Different aspects of calculus used in game development.
chapter: 3
---

# Derivatives and differentiation

## Introduction

Derivatives are used extensively in games, even though many people don't realize
that. When you are calculating the difference between this and last position,
because you want to align an object along the path it follows, you are actually
trying to calculate the derivative at the current position (Note that if you use
physics with an integrator, you can just use the velocity. We are talking about
the case where an analytical function is used instead).

$$f'(t) = \frac{f(t + dt) - f(t)}{dt}$$

The problem is that calculating the direction this way will depend a lot on the
elapsed time. If dt is too large, you might be off a by a lot, and if dt is too
small, your vector may become undefined.

A better way is to calculate the derivative of the function you use to decide
the trajectory. See for example the following ballistics function:

$$f(t) = p_0 + v_0 * t + \frac{g * t^2}{2}$$

This function calculates the position of a projectile given the initial position
$p_0$, the initial velocity $v_0$ and the gravity vector, which is most likely
zero in the x dimension, e.g. $(0, g)$. So how do we get the direction of the
trajectory at a time t? By calculating the velocity, which is the derivative of
the position.

$$f'(t) = v_0 + g * t$$

This function will give us the velocity vector at each time t. If we take the
angle of this vector, we can rotate our sprite in order to align it with the
followed trajectory.

## Local minimum, maximum and inflection points

What if we want to know how high our projectile will go? Let's say we have an
enemy in a cave system throwing stones. These stones follow the same kind of
ballistic trajectory which we discussed before. The enemy is throwing the stones
at random angles, but we don't want it to hit the ceiling. How do we get the
highest point of the trajectory?

A local maximum or minimum of a function is a point on the function where the
derivative is 0. This is logical as with a local minimum you go up (positive),
reach the top, and go down (negative), so at the top your derivative is 0. So
what if we set our derivative to 0? Note that we only look at the y output of
our function

$$f'(t) = v_{y0} + g * t = 0$$

This happens when

$$t = \frac{-v_{y0}}{g}$$

Using this t in our original function gives the position where we reach a
maximum.

$$p_{y0} + v_{y0} * (\frac{-v_{y0}}{g}) + \frac{g * (\frac{-v_{y0}}{g})^2}{2}$$

We see that this happens at

$$p_{y0} + \frac{-v_{y0}^2}{g} + \frac{v_{y0}^2}{2*g}$$

So the maximum position of our projectile for a given position and velocity is

$$p_{y0} - \frac{v_{y0}^2}{2*g}$$

We can now say, given an angle, how high the projectile will go, and only shoot
when it won't hit the ceiling. But we can do better than that, since we know
that

$$h = p_{y0} - \frac{v_{y0}^2}{2*g}$$

we can get the velocity in function of the height

$$v_{y0} = \sqrt(2 * g * (p_{y0} - h))$$

So we know our maximum y velocity given the height of our ceiling.

The ballistics case is special since the function has no local minimum and no
inflection point. If our analytical function has minima or inflection points, we
need to look at the sign of the second derivative. If it is negative, our point
is a maximum, if it is positive a minimum, and if it is zero, we have found an
inflection point. The second derivative of our ballistics function is

$$f''(t) = g$$

Thus whether we found a minimum, maximum or inflection point is completely
dependent on the sign or value of g.

## Taylor series

Sometimes there are functions which we can't calculate directly. Let's say you
need to calculate a cosine, but there is no cosine function. You only have
mathematical operators (or a non-scientific calculator).

With derivatives, you can approximate the function around a given point. This
approximation is a polynomial and is called a Taylor series. Given a function f,
its Taylor series is

$$f(x) = f(a) + \frac{f'(a)}{1!}(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + ...$$

To give an example, let's take f(x) = cos(x). We know that its derivatives are

$$f'(x) = -sin(x)$$

$$f''(x) = -cos(x)$$

$$f'''(x) = sin(x)$$

So our Taylor series for cosine is

$$cos(x) = cos(a) − \frac{sin(a)}{1!}(x-a) − \frac{cos(a)}{2!}(x-a)^2 + \frac{sin(a)}{3!}(x-a)^3 + ...$$

For cos(x) around 0 (so a = 0) we get

$$cos(x) = cos(0) − \frac{sin(0)}{1!}(x-a) − \frac{cos(0)}{2!}(x-a)^2 + \frac{sin(0)}{3!}(x-a)^3 + ...$$

Since we know cos() = 1 and sin(0) = 0 we get

$$cos(x) = 1 − \frac{0}{1!}(x-0) − \frac{1}{2!}(x-0)^2 + \frac{0}{3!}(x-0)^3 + \frac{1}{4!}(x-0)^4 + ...$$

Cleaning this up we get an approximation for cosine around 0

$$cos(x) = 1 − \frac{x^2}{2!} + \frac{x^4}{4!} − ...$$

This is how trigonometric, logarithmic and other functions can be converted into polynomials which can then be calculated using basic operators. This is how also
how libraries implement them.

## Calculating derivatives

In case you don't remember how to calculate the derivative of a function, here is a short guide. For a constant function, the derivative is 0.

$$f(x) = c$$

$$f'(x) = 0$$

The derivative of a sum is the sum of the derivatives

$$f(x) = a(x) + b(x)$$

$$f'(x) = a'(x) + b'(x)$$

The derivative of a product is

$$f(x) = a(x) + b(x)$$

$$f'(x) = a'(x)b(x) + b'(x)a(x)$$

The derivative of a nested function is

$$f(x) = a(b(x))$$

$$f'(x) = a'(b(x)) * b'(x)$$

Out of the product rule, we can derive the rule for polynomials. This is the
rule which you'll use most of the time, as anything from ballistics to general
splines are polynomials

$$f(x) = x^n$$

$$f'(x) = n * x^{(n-1)}$$

Out of the nested function rule, we can derive the rule for

$$f(x) = \frac{1}{a(x)}$$

$$f'(x) = \frac{a'(x)}{a(x)^2}$$

From this we can get the quotient rule

$$f(x) = \frac{a(x)}{b(x)}$$

$$f'(x) = \frac{a'(x)b(x) + b'(x)a(x)}{b(x)^2}$$

For the two most used trigonometric functions we have

$$f(x) = cos(x)$$

$$f'(x) = -sin(x)$$

and

$$f(x) = sin(x)$$

$$f'(x) = cos(x)$$

For logarithmic functions

$$f(x) = log_c(x)$$

$$f'(x) = \frac{1}{x*ln(c)}$$

and

$$f(x) = ln(x)$$

$$f'(x) = \frac{1}{x}$$

For exponential functions

$$f(x) = e^{ax}$$

$$f'(x) = ae^{ax}$$

and

$$f(x) = x^x$$

$$f'(x) = x^x(1 + ln(x))$$

## Partial derivatives

Sometimes we have functions with more than one input. In that case we can
calculate partial integrals, which are integrals in one of the dimensions of the
function.

For example the function

$$f(x, y) = x^2 + xy + y^2$$

Has a partial derivative in x equal to

$$f_x'(x, y) = 2x + y$$

This function gives the rate of change in the x dimension at every point $(x,
y)$.

# Integration

## Introduction

Integration is the opposite of differentiation. While differentiation looks for
the rate of change of a give function, integration looks for a function given a
rate of change.

Do we use that in games? Yes we do. Every physics simulation uses it. When we
use simple Euler integration, we have

$$vel = vel + acc * dt$$

$$pos = pos + vel * dt$$

We integrate twice here, we calculate our new velocity from the rate of change
of velocity, acceleration. Then we calculate our new position from the rate of
change of position, velocity. Our velocity at a certain time is thus a sum of
accelerations at certain points of time over a certain time span.

$$vel = vel_0 + \sum_{i=0}^{n}acc_i*dt_i$$

Same for position

$$pos = pos_0 + \sum_{i=0}^{n}vel_i*dt_i$$

These are Riemann sums. You can see them as rectangles with as height f(x) and
width dt. Thus the result will be better the smaller dt is, as many thin boxes
can approximate the function better than fewer larger boxes. This is why the
KAPLAY physics engine runs at a fixed framerate. If it would run at the display
framerate, results would be different between different devices. More performant
devices would obtain better approximations for the same integral.

There are two kinds of integrals. What we just described is a definite integral.
A calculation of the signed surface area under the function. An indefinite
integral is a function called the anti-derivative.

## Indefinite integrals

If you know how to find the derivative of a function, you can find the
anti-derivative of a function. What you need to look out for though is
constants. The derivative of a constant was zero, this means that there are many
anti-derivatives possible for the same function. For example both

$$x^2$$

$$x^2 + 5$$

derive to $2x$, thus any function $x^2 + c$, with c a constant is an
anti-derivative of $2x$.

We can use integrals to calculate areas of various surfaces, water volumes or
obtain a function when we know the rate of change of a certain value.
