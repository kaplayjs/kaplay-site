---
title: Algebra
description: Different aspects of algebra used in game development.
chapter: 2
---

# Scalars or numbers

The real numbers form an algebra. We can add, subtract, multiply and divide them. The addition and multiplication is left and right distributive

$$
a * (b + c) = a * b + a * c
$$

$$
(b + c) * a = b * a + c * a
$$

Obviously the multiplication is compatible with scalars.

Multiplication is also commutative.

$$
a * b = b * a
$$

Numbers have their negation $-a$ which gives zero when added, as well as their reciprocal $\frac{1}{a}$ which gives 1 when multiplied.

## Powers

Multiplication is a shorthand for addition

$$
a + a + a = 3a
$$

Likewise powers are a shorthand for multiplication

$$
a * a * a = a^3
$$

Numbers to a negative power are the reciprocal of the same number to the positive power.

$$
a^{-2} = \frac{1}{a^2}
$$

Fractional powers gives use operations like square root

$$
a^{\frac{1}{2}} = \sqrt{2}
$$

# Vectors

Vectors take on many forms in games. We can find them for example as points, translations, forces or even rotations. A vector is something which can't be expressed using one number. For example a point in 2D needs 2 numbers, an x and an y value.

## Addition

There are different ways to see a vector. We can use a 2D vector to identify a point in 2D space. For example the point (3, 2) can be seen as the absolute coordinates of a specific point. But we can also see it a translation of the origin 3 units in the horizontal direction, and 2 units in the vertical direction. We can apply this translation to any point by using vector addition.

$$
(0, 0) + (3, 2) = (3, 2)
$$

$$
(4, 4) + (3, 2) = (7, 6)
$$

$$
u + v = (u_x + v_x, u_y + v_y)
$$

Even though all three terms are vectors, we can see this expression as point + vector = point.

## Multiplication with a scalar

We can't multiply two vectors. But if we multiply a vector by a scalar, we get a new, scaled vector.

$$
2 * (2, 4) = (4, 8)
$$

$$
s * u = (s * u_x, s * u_y)
$$

When we scale, only the distance traveled changes, not the direction. This is because the scale is uniform, both dimensions are scaled equally.

## Subtraction

Since we can multiply with the scalar -1, and in that way obtain the opposite vector, we can also subtract vectors.

$$
(4, 4) - (3, 2) = (1, 2)
$$

$$
u - v = (u_x - v_x, u_y - v_y)
$$

This allows us to make the translation vector t which translates a point u to another point v.  

$$
t = v - u
$$

So in this case we see the expression as vector = point - point. Note that to make a vector from two points,  you subtract the origin from the destination. The order is important. 

## Division by a scalar

Since scalars have a reciprocal, we can divide by a scalar as well.

$$
u / s = (u_x / s, u_y / s)
$$

## Unit vector

If we scale a vector by the reciprocal of its length, we obtain a unit vector. A unit vector always has length 1.

$$
unit(v) = v / length(v)
$$

In situations where only the direction of the vector matters, it is often important to use a unit vector.

## Polar coordinates

If we look at a vector as a translation, we can see that it moves a point along a certain distance and in a certain direction.

Until now, we saw a vector as a Cartesian coordinate $(x, y)$. But if we look at it as a length r and an angle $\phi$ we can see it as a Polar coordinate $(r, \phi)$. It is still a vector, but the meaning of the elements is different. It is fairly easy to convert between the two. From Cartesian coordinates we can find the corresponding Polar coordinates as

$$
r = \sqrt{(x^2 + y^2)}
$$

$$
\phi = atan2(y, x)
$$

Why the length of the vector is the square root of the sum of the squares of its elements will be discovered shortly. We get the angle by turning the slope into an angle using atan2. The atan function takes just a slope and returns the corresponding angle as between $-\pi/2$ (-90) and $\pi/2$ (90). The atan2 function is similar, but looks at the signs of both x an y to determine the correct quadrant and returns an angle between 0 and $2\pi$ (360).

From Polar coordinates we can find the corresponding Cartesian coordinates as

$$
x = r * cos(\phi)
$$

$$
y = r * sin(\phi)
$$

Remember, cosine and sine are the x and y coordinate respectively of the unit vector pointing in the direction of the given angle. If we scale the cosine and sine by the length of the vector, we obtain the elements of the vector itself.

Now we might think that we are able to rotate a vector, by converting it to Polar coordinates, changing the angle and converting it back to Cartesian coordinates. And indeed, we could do that, but it would be slow. This is because trigonometric functions come with some cost. Why this is, is explained in the chapter on calculus.

To find a better way to rotate a vector we need to look at complex numbers.

# Complex numbers

Complex numbers in math classes are mostly seen as a way to take the square root of a negative number. This is possible because $i^2=-1$, thus for example $\sqrt{-4}=2i$. The letter $i$ stands for the imaginary number. For game developers complex numbers are much more valuable than that though.

A complex number is usually written as $a + bi$.

We can visualize it just like a vector, with $x=a$ and $y=b$.

## Addition and subtraction

Like numbers, and vectors, complex numbers can be added and subtracted.

$$
(a + bi) + (c + di) = a + c + (b + d)i
$$

$$
(a + bi) - (c + di) = a - c + (b - d)i
$$

## Multiplication

However, unlike vectors, complex numbers can also be multiplied.

$$
(a + bi) \cdot (c + di) = ac - bd + (ad + bc)i
$$

If we look at the angle of the direction of this product, its angle is the sum of the angles of $(a + bi)$ and $(c + di)$. Thus multiplying complex numbers adds their angles. This is what we can use to rotate vectors. If we want to rotate a vector (x, y) by an angle $\phi$, we only need to convert this angle to a vector, which we saw is $(cos(\phi), sin(\phi))$, and use complex multiplication to obtain the rotated vector. 

$$
(x * cos(\phi) - y * sin(\phi), x * sin(\phi) + y * cos(\phi))
$$

Note that it is important that we multiply with a unit vector, if not, we would introduce a scale. 

You might recognize this rotation formula, possibly in its following matrix form.

$$
\begin{bmatrix}
x  &  y
\end{bmatrix} \times	
\begin{bmatrix}
cos(\phi) & -sin(\phi)\\
sin(\phi) & cos(\phi)
\end{bmatrix} 	
$$

This result is quite important as it shows that we are not really rotating using an angle, we are rotating using the unit vector $(cos(\phi), sin(\phi))$. It is important to realize this as we often do unnecesary conversions. For example when we want to make a sprite point towards the mouse, we often create a vector

$$
dir = mousePos() - sprite.pos
$$

Then we take the angle from this vector

$$
angle = atan2(dir.y, dir.x)
$$

And rotate the sprite using this angle. However, to actually rotate, the angle is converted to cos(angle) and sin(angle). This is just the unit vector of dir.

$$
unit(dir) = (cos(angle(dir)), sin(angle(dir)))
$$

$$
unit(dir) =  = dir / length(dir)
$$

We could as well have taken the unit vector of dir and rotated using this vector. Going through angles is a roundabout way. Blame bad math classes for the fact that most graphics APIs only have rotate(angle: number) and not rotate(direction: vec2).

## Division

Complex numbers have a reciprocal

$$
\frac{1}{(c + di)} = \frac{c}{c^2+d^2} - \frac{d}{c^2+d^2}i
$$

This means we can not only multiply complex numbers, but divide as well

$$
\frac{(a + bi)}{(c + di)} = \frac{ac + bd}{c^2+d^2} + \frac{bc - ad}{c^2+d^2}i
$$

When we examine the angles again, we see that complex division subtracts angles. If we have two vectors (a, b) and (c, d), complex division can give us a vector which has an angle equal to the angle of (a, b) minus the angle of (c, d). This gives us a formula to calculate the angle between two vectors, without having to calculate their individual angles. We don't need to go through Polar coordinates.

Remember that we could get the angle of a vector using atan2.

$$
\phi = atan2(y, x)
$$

We can fill in the result of the quotient of our vectors. (observant people will have noticed that we switched the sign of the imaginary part. This is because in our 2D game engine the y axis goes down instead of up as is usual in mathematics).

$$
\phi = atan2(\frac{ad - bc}{c^2+b^2}, \frac{ac + bd}{c^2+b^2})
$$

But wait, atan2 just needs the slope y/x, and the individual signs of x and y. So the denominator isn't needed. It will get divided away anyway. So to get the angle between two vectors we just need to use

$$
\phi = atan2(ad - bc, ac + bd)
$$

These two formulas for y and x do look familiar don't they? this is because they are the 2D dot and cross products.

# Vector dot and cross products

$$
dot(u, v) = u_x * v_x + u_y * v_y
$$

$$
cross(u, v) = u_x * v_y - u_y * v_x
$$

If we have these functions, derived from complex division we can write the angle between two vectors as

$$
angle(u, v) = atan2(cross(u, v), dot(u, v))
$$

Note that the order of the operants is important, as it is for the cross product. Thus 

$$
angle(u, v) = -angle(v, u)
$$

$$
cross(u, v) = -cross(v, u)
$$

We should by now realize that in the case of unit vectors, dot gives us the cosine of the angle between these vectors. While cross gives us the sine of the angle between these vectors.
In case the vectors are not unit, we will have a multiplier equal to the product of the lengths of the vectors.

$$
dot(u, v) = length(u) * length(v) * cos(\phi)
$$

$$
cross(u, v) = length(u) * length(v) * sin(\phi)
$$

This is why dot(u, u) gives us the squared length of u. The angle between u and u is obviously zero, thus the cosine is 1.

$$
dot(u, u) = length(u) * length(u) * cos(0) = (length(u))^2
$$

Since

$$
dot(u, u) = u_x^2 + u_y^2
$$

We get the formula for length

$$
length(u) = \sqrt{(u_x^2 + u_y^2)}
$$

## 2D Vectors do not form an algebra

Since 2D vectors do not have a product which is left and right distributive, they do not form an algebra. The complex numbers do, as they do have a product which is not only bilinear (left and right distributive) but even both commutative and associative. So the complex numbers form an algebra. 3D vectors have a cross product which is left and right distributive and they form an algebra. Their cross product is neither associative nor commutative though. If we look at quaternions, the equivalent of complex numbers used in 3D, their Hamilton product is bilinear and associative.

# Polynomials

Polynomials are expressions containing a variable and using only operators +=*/ and exponentiation with positive integer exponents. For example

$$
2x + 4
$$

$$
x^2 + 4x + 2
$$

Polynomials form an algebra, with polynomial multiplication.

## The line and linear interpolation

The most simple polynomial, one of degree 1, is the line. A line is typically written as $y = a + bx$. With a and b constants. The constant a is called the intercept (where we cross the y axis when x is 0), and b the slope.

We see that if we choose the slope as (b-a), that we obtain linear interpolation or lerp. What happens is that we create a line which goes from a to b as t goes from 0 to 1.

$$
lerp(a, b, t) = a + (b-a) * t
$$

Since we have addition, subtraction and scalar multiplication for vectors, we can do this for vectors a and b as well. Like this we can move from one location to another with constant speed.

What if the vector encodes a direction to use for rotation though. Say we have two vectors we use to rotate, can we just use linear interpolation? Not without modification. The problem is that a linear combination of two unit vectors will not give a new unit vector. This means we need to normalize the new vector, to make it a unit vector again. This gives normalized lerp.

$$
nlerp(a, b, t) = unit(a + (b-a) * t)
$$

However, this lerp does not have constant speed. There is a better way. The problem here is that we looked at direction vectors as vectors. But for direction vectors and the angles they represent, we should use complex number operations. As we saw, adding angles is multiplying complex numbers, and subtracting angles is dividing complex numbers. We're only left with multiply, which becomes exponentiation. Putting it together, we get slerp (spherical linear interpolation, which is actually exponential interpolation).

$$
slerp(a, b, t) = a * (b / a)^t
$$

This is what is used to interpolate between quaternions (the equivalent of complex numbers used in 3D graphics). While it looks promising, there is a caveat unfortunately. The power operation isn't that easy to do. While we know how to multiply complex numbers, and thus theoretically can calculate $(a+bi)^n$ where n is an integer, we're actually using real powers between 0 and 1, not integers. A solution is to use the Euler representation of a complex number.

$$
e^{i\phi} = r * (cos(\phi)+sin(\phi)i)
$$

Where r is the length of the vector and $\phi$ its angle. Knowing this, it is easy to take a power of a complex number using DeMoivre's Theorem

$$
(e^{i\phi})^t = r^t * (cos(t*\phi)+sin(t*\phi)i)
$$

However, to do this we need to convert the vector to Polar coordinates and back to Cartesian coordinates. Something we didn't like due to it's performance impact. So while slerp is quite an elegant solution mathematically, not being able to take a real power of a complex number directly kind of spoils the fun.

Still, slerp is not only for vectors or complex numbers in particular. It can be used on every multiplicative value. Now what is a multiplicative value? If we look at pos or angle, we combine two translations or angles by adding them. 

$$
pos = pos + translationVector
$$

$$
angle = angle + rotationAngle
$$

However combining two scale factors is done by multiplying them.

$$
scale = scale * scaleFactor
$$

To add scale factors, you multiply them, just like you do with complex numbers. This means that scale actually should use slerp, not lerp. If we look what lerp gives for lerp(2, 8, 0.5), we get 5, while slerp(2, 8, 0.5) gives 4. If you think about scale, a scale halfway between 2 and 8 would be 4, not 5. Another place where we see this is audio. If we look for an audio sampling rate between 11025Hz and 44100Hz, then lerp gives us 27562.5Hz, while slerp gives us correctly 22050Hz.

So do all engines and editors interpolate scale wrong? Yes, yes they do. Just like the lack of a rotate function with a vector parameter, we are dealing with something which isn't well understood by most people. Some audio engineers know, but graphics people are still in the dark.

# Matrices

A matrix can be seen as a two dimensional vector (though more dimensions are possible). The size or shape of a matrix depends on what we are using it for. In 2D games, the place where you might encounter it most frequently is transformations. Now you might ask, "why use a matrix?", as you can already translate, rotate and scale vectors now. The reason is mostly composition and inverting transformations. It is easy to compose two translations, by just adding them. But what if you add a rotation? How do you store both the rotation and translation. And when you translate after the rotation, your next translation should work according to the new rotated coordinate system.

To make all this easier, we use matrices. Though matrices are not the only way to do this, as we'll see later, there are other more compact constructs as well.

To add transformations, we multiply their matrices. Just like complex numbers.

## Matrix multiplication

Multiplying a matrix A with a matrix B means taking the dot product of the row vectors of A with the column vectors of B.

$$
\begin{bmatrix}
a & b & c\\
d & e & f\\
g & h & i\\
\end{bmatrix} \times
\begin{bmatrix}
j & k & l\\
m & n & o\\
p & q & r\\
\end{bmatrix} =
\begin{bmatrix}
a*j+b*m+c*p & a*k+b*n+c*q & a*l+b*o+c*r\\
d*j+e*m+f*p & d*k+e*n+f*q & d*l+e*o+f*r\\
g*j+h*m+i*p & g*k+h*n+i*q & g*l+h*o+i*r\\
\end{bmatrix}
$$

Note that this multiplication is not commutative, thus

$$
A*B != B*A
$$

This is good because transformations are not commutative.

## Identity matrix

To start with transformation specific matrices, here is an identity matrix. This matrix is like the number 1. If you multiply by 1, nothing happens. It's the same with this matrix. Multiplying by it gives you just the original matrix.

$$I = 
\begin{bmatrix}
1 & 0 & 0\\
0 & 1 & 0\\
0 & 0 & 1\\
\end{bmatrix} 	
$$

$$A * I = A$$

## Translation matrix

Now, our vector is only 2 dimensional, so why a 3 dimensional matrix? It's to support translation. If we want to translate by a vector t, our translation matrix looks like

$$T = 
\begin{bmatrix}
1 & 0 & 0\\
0 & 1 & \\
t_x & t_y & 1\\
\end{bmatrix} 	
$$

So let's multiply our vector v with that matrix to see what happens

$$
\begin{bmatrix}
v_x & v_y & 1
\end{bmatrix} \times 
\begin{bmatrix}
1 & 0 & 0\\
0 & 1 & 0\\
t_x & t_y & 1\\
\end{bmatrix} =
\begin{bmatrix}
v_x + t_x & v_y + t_y & 1
\end{bmatrix}
$$

As you can see, we wrote our vector in the form of a row matrix, and we added a 1 to the end. Our result is a row matrix, also with a 1 at the end. As we can see, we successfully translated v by t, but what is that 1. The 1 at the end is actually a handy tool to distinguish points and normals. If our vector was a normal, it would have a 0 at the end. Let's see what would happen.

$$
\begin{bmatrix}
n_x & n_y & 0
\end{bmatrix} \times 
\begin{bmatrix}
1 & 0 & 0\\
0 & 1 & 0\\
t_x & t_y & 1\\
\end{bmatrix} =
\begin{bmatrix}
n_x & n_y & 0
\end{bmatrix}
$$

Nothing seems to have happened. Which is exactly what we want. If we rotate a shape, normals will also rotate with the shape, but normals shouldn't translate if the shape is translated. This is because normals show the direction of the surface at the point where they are located, and the neither the surface , nor the normal's location relative to the surface changes under translation.

## Rotation matrix

So now that we have that established, let's rotate. We already saw how this matrix looks in the section about complex numbers.

$$
\begin{bmatrix}
v_x & v_y & 1
\end{bmatrix} \times 
\begin{bmatrix}
cos(\phi) & sin(\phi) & 0\\
-sin(\phi) & cos(\phi) & 0\\
0 & 0 & 1\\
\end{bmatrix} =
\begin{bmatrix}
v_x * cos(\phi) - v_y * sin(\phi) & v_x * sin(\phi) + v_y * cos(\phi) & 1
\end{bmatrix}
$$

## Scale matrix

Scale is even easier. If we want to scale by s, we get

$$
\begin{bmatrix}
v_x & v_y & 1
\end{bmatrix} \times 
\begin{bmatrix}
s_x & 0 & 0\\
0 & s_y & 0\\
0 & 0 & 1\\
\end{bmatrix} =
\begin{bmatrix}
v_x * s_x & v_y * s_y & 1
\end{bmatrix}
$$

Note that if we only want to allow a uniform scale, we need to keep $s_x=s_y$.

## Matrix transpose

The transpose of a matrix is one where rows are switched to columns.

$$
\begin{bmatrix}
a & b & c\\
d & e & f\\
g & h & i\\
\end{bmatrix}^T =
\begin{bmatrix}
a & d & g\\
b & e & h\\
c & f & i\\
\end{bmatrix}
$$

For a row vector that means that it becomes a column vector

$$
\begin{bmatrix}
a & b & c
\end{bmatrix}^T =
\begin{bmatrix}
a \\
b \\
c \\
\end{bmatrix}
$$

The transpose of the transpose of a matrix results in the original matrix.

## Pre and post-multiplication

What we used for our transformation matrices is pre-multiplication, as the vector went in front of the matrix. 

$$
\begin{bmatrix}
v_x & v_y & 1
\end{bmatrix} \times 
\begin{bmatrix}
1 & 0 & 0\\
0 & 1 & 0\\
t_x & t_y & 1\\
\end{bmatrix} =
\begin{bmatrix}
v_x + t_x & v_y + t_y & 1
\end{bmatrix}
$$

Most math and graphics systems use post multiplication. The matrices are the same, but transposed. Vectors are column vectors in this case.

$$
\begin{bmatrix}
1 & 0 & t_x\\
0 & 1 & t_y\\
0 & 0 & 1\\
\end{bmatrix} \times 
\begin{bmatrix}
v_x \\ v_y \\ 1
\end{bmatrix}
 =
\begin{bmatrix}
v_x + t_x \\ v_y + t_y \\ 1
\end{bmatrix}
$$

## Inverse Matrix

When we have a scalar $x$, the scalar $x^{-1}=1/x$ can be defined so that $x*x^{-1}=1$, as long as $x\ne0$. Similarly, we can calculate the inverse matrix $A^{-1}$ from $A$ so that $A*A^{-1}=I$.

The requirement for a matrix to be invertible is having a determinant which is not 0.

### The determinant

The determinant can be calculated in different ways, but what is it really? The determinant of $I$ is 1, so is the determinant of a translation or rotation matrix. Only a scale matrix or a transform containing a scale has a determinant different from 1. For a 2 by 2 matrix

$$
\begin{bmatrix}
a & b \\ c & d
\end{bmatrix}
$$

it is the surface area of a parallelogram made from (0, 0) (a , b) (c, d) and (a + c, b + d), thus the determinant is $ad - bc$. For a 3 by 3 matrix
 
$$
\begin{bmatrix}
a & b & c \\ d & e & f \\ g & h & i
\end{bmatrix}
$$
 
it is a volume equal to $aei+bfg+cdh-ceg-bdi-afh$.

The determinant is used in various situations, but right now we'll use it to calculate the inverse matrix. It is logical that if we calculate the inverse of a matrix which scales, that we will need one which divides by that scale to negate it. This is why, if the matrix has a zero scale, we can't calculate the inverse, since we would divide by zero.

Later we will learn about eigenvectors and eigenvalues which can give use the actual rotation and scale. But for now we'll continue calculating the inverse.

### Calculating the inverse matrix

The inverse of a 2 by 2 matrix A is

$$
\begin{bmatrix}
a & b \\ c & d
\end{bmatrix}^{-1}=
\frac{1}{det(A)}\begin{bmatrix}
d & -b \\ -c & a
\end{bmatrix}
$$

The inverse of a 3 by 3 matrix A is

$$
\begin{bmatrix}
a & b & c \\ d & e & f \\ g & h & i
\end{bmatrix}^{-1}=
\frac{1}{det(A)}\begin{bmatrix}
ei-fh & -(bi-ch) & bf-ce \\
-(di-fg) & (ai-cg) & -(af-cd) \\
(dh-eg) & -(ah-bg) & (ae-bd)
\end{bmatrix}
$$

Why do we need the inverse? If we have an object which is transformed in order to place it in the world somewhere in a certain orientation with a certain scale, we have a transform which transforms local points to a point in the world. If we can invert this transform, we can transform world points to local points. This is just one example, but there are really many places where this is useful. Like ellipses for example, these can be described as a matrix, which means we can find the transformation to transform an ellipse to a circle by inverting the matrix. This then helps us to simplify finding intersections with various shapes.